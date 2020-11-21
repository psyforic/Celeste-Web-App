using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Celeste.Authorization.Users;
using Celeste.Modes;
using Celeste.Modes.Dto;
using Celeste.MultiTenancy.CelesteDashboard.Dto;
using Celeste.Users.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.MultiTenancy.CelesteDashboard
{
    public class CelesteDashboardAppService : CelesteAppServiceBase, ICelesteDashboardAppService
    {
        private readonly IRepository<Mode, Guid> _modeRepository;
        private readonly IRepository<ModeStats, Guid> _modeStatsRepository;

        //  private readonly IRepository<ModeListDto, Guid> __modeListRepository;
        private readonly UserManager _userManager;


        public CelesteDashboardAppService(
            IRepository<Mode, Guid> modeRepository,
            IRepository<ModeStats, Guid> modeStatsRepository,
            UserManager userManager)
        {
            _modeRepository = modeRepository;
            _modeStatsRepository = modeStatsRepository;
            _userManager = userManager;
        }

        public Task<UserDto> GetTotalUsers()
        {
            throw new NotImplementedException();
        }

        public async Task<ListResultDto<ModeStatsDto>> GetWeeklyModes()
        {
            List<ModeStatsDto> weekDay = new List<ModeStatsDto>();
            if (AbpSession.TenantId != null)
            {
                var modeNames = new string[] { "Sunrise", "Mid-Morning", "Mid-Day", "Sunset", "Therapy" };
                for (int i = 0; i < modeNames.Length; i++)
                {
                    var day = new ModeStatsDto { Name = modeNames[i] };
                    weekDay.Add(day);
                }
                var modeStats = await _modeStatsRepository.GetAll()
                    .Where(x => x.Time.AddDays(7) >= DateTime.Now)
                    .Include(m => m.Mode)
                    .ToListAsync();
                if (modeStats != null && modeStats.Count > 0)
                {
                    foreach (var item in modeStats)
                    {
                        weekDay.FirstOrDefault(x => x.Name.Equals(item.Mode.Name)).Count += item.Count;
                        weekDay.FirstOrDefault(x => x.Name.Equals(item.Mode.Name)).Date = item.Time;
                    }
                }
            } 
            else
            {
                using(CurrentUnitOfWork.DisableFilter(AbpDataFilters.MustHaveTenant, AbpDataFilters.MayHaveTenant))
                {
                    var modeNames = new string[] { "Sunrise", "Mid-Morning", "Mid-Day", "Sunset", "Therapy" };
                    for (int i = 0; i < modeNames.Length; i++)
                    {
                        var day = new ModeStatsDto { Name = modeNames[i] };
                        weekDay.Add(day);
                    }
                    var modeStats = await _modeStatsRepository.GetAll()
                        .Where(x => x.Time.AddDays(7) >= DateTime.Now)
                        .Include(m => m.Mode)
                        .ToListAsync();
                    if (modeStats != null && modeStats.Count > 0)
                    {
                        foreach (var item in modeStats)
                        {
                            weekDay.FirstOrDefault(x => x.Name.Equals(item.Mode.Name)).Count += item.Count;
                            weekDay.FirstOrDefault(x => x.Name.Equals(item.Mode.Name)).Date = item.Time;
                        }
                    }
                }
                
            }
            return new ListResultDto<ModeStatsDto>(ObjectMapper.Map<List<ModeStatsDto>>(weekDay));

        }

        private async Task<ListResultDto<ModeStatsDto>> GetModesStatus()
        {
            throw new NotImplementedException();
        }

        Task<ListResultDto<ModeStatsDto>> ICelesteDashboardAppService.GetModesStatus()
        {
            throw new NotImplementedException();
        }

        private async Task<ModeListDto> GetTotalModes()
        {
            throw new NotImplementedException();
        }

        Task<ModeListDto> ICelesteDashboardAppService.GetTotalModes()
        {
            throw new NotImplementedException();
        }

        /*  
           private async Task<List<ModeList>> GetModes()
           {
               if (!AbpSession.TenantId.HasValue)
               {
                   using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
                   {
                       return await  _modeRepository.GetAll().In;
                   }
               }
           }*/
    }
}

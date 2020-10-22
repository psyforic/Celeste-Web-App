using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Celeste.Authorization.Users;
using Celeste.Modes.Dto;
using Celeste.UserModes;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes
{
    public class ModeAppService : AsyncCrudAppService<Mode, ModeListDto, Guid, PagedResultRequestDto, CreateModeInput, GetModeOutput>, IModeAppService
    {
        private readonly IModeManager _modeManager;
        private readonly IRepository<Mode, Guid> _modeRepository;
        private readonly IRepository<UserMode, Guid> _userModeRepository;
        private readonly IRepository<User, long> _userRepository;
        private readonly IRepository<ModeStats, Guid> _modeStatsRepository;

        public ModeAppService(
            IModeManager modeManager,
            IRepository<Mode, Guid> modeRepository,
            IRepository<UserMode, Guid> userModeRepository,
            IRepository<User, long> userRepository,
            IRepository<ModeStats, Guid> modeStatsRepository
            ) : base(modeRepository)
        {

            _modeManager = modeManager;
            _modeRepository = modeRepository;
            _userModeRepository = userModeRepository;
            _userRepository = userRepository;
            _modeStatsRepository = modeStatsRepository;
        }
        public async Task<ListResultDto<ModeListDto>> GetAllModes()
        {
            var modes = await _modeRepository.GetAll().ToListAsync();
            return new ListResultDto<ModeListDto>(ObjectMapper.Map<List<ModeListDto>>(modes));
        }
        /*    public async Task<ListResultDto<ModeListDto>> GetAllModes(GetModeOutput modeOutput)
            {
                var modes = await _modeRepository.GetAll().Where(x => (modeOutput.FromDate == null || x.CreationTime >= modeOutput.FromDate.Value.Date) &&
                 (modeOutput.ToDate == null || x.CreationTime <= modeOutput.ToDate.Value.Date))
                    .OrderByDescending(e => e.CreationTime).ToListAsync();
                return new ListResultDto<ModeListDto>(ObjectMapper.Map<List<ModeListDto>>(modes));
            }*/
        public async Task AssignModeToUsers(List<long> userIds, Guid modeId)
        {

            if (userIds.Count > 0)
            {
                if (await _modeRepository.FirstOrDefaultAsync(modeId) != null)
                {
                    foreach (long userId in userIds)
                    {
                        if (await _userRepository.FirstOrDefaultAsync(userId) != null)
                        {
                            UserMode userMode = new UserMode
                            {
                                UserId = userId,
                                ModeId = modeId,
                                TenantId = AbpSession.TenantId.Value
                            };
                            await _userModeRepository.InsertAndGetIdAsync(userMode);
                        }
                    }
                }

            }

        }

        public async Task AddSelectedMode(int tenantId, Guid modeId)
        {
            var modeStat =await _modeStatsRepository.FirstOrDefaultAsync(x => x.ModeId == modeId && (x.Time.AddDays(7) > DateTime.Now));
            if (modeStat == null)
            {
                var newModeStat = new ModeStats { Time = DateTime.Now, Count = 1, TenantId = tenantId, ModeId = modeId };
                await _modeStatsRepository.InsertAsync(newModeStat);
            }
            else {
                modeStat.Count++;
                await _modeStatsRepository.UpdateAsync(modeStat);

            }
        }
    }
}

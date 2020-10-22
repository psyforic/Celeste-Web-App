using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Celeste.Modes.Dto;
using Celeste.MultiTenancy.CelesteDashboard.Dto;
using Celeste.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.MultiTenancy.CelesteDashboard
{
    public interface ICelesteDashboardAppService: IApplicationService
    {
        Task<ListResultDto<ModeStatsDto>> GetModesStatus();
        Task<UserDto> GetTotalUsers();
        Task<ModeListDto> GetTotalModes();

        Task<ListResultDto<ModeStatsDto>> GetWeeklyModes();
    }
}

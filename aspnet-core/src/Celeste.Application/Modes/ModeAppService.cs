using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Celeste.Modes.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Modes
{
    public class ModeAppService : AsyncCrudAppService<Mode,ModeListDto,Guid, PagedResultRequestDto,CreateModeInput,GetModeOutput>, IModeAppService
    {
        private readonly IModeManager _modeManager;
        private readonly IRepository<Mode, Guid> _moderepository;

        public ModeAppService(
            IModeManager modeManager,
            IRepository<Mode, Guid> modeRepository
            ) : base(modeRepository)
        {
            _modeManager = modeManager;
            _moderepository = modeRepository;
        }
    }
}

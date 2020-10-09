using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Celeste.Modes.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes
{
    public class ModeAppService : AsyncCrudAppService<Mode, ModeListDto, Guid, PagedResultRequestDto, CreateModeInput, GetModeOutput>, IModeAppService
    {
        private readonly IModeManager _modeManager;
        private readonly IRepository<Mode, Guid> _modeRepository;

        public ModeAppService(
            IModeManager modeManager,
            IRepository<Mode, Guid> modeRepository
            ) : base(modeRepository)
        {
            _modeManager = modeManager;
            _modeRepository = modeRepository;
        }
        public async Task<ListResultDto<ModeListDto>> GetAllModes()
        {
            var modes = await _modeRepository.GetAll().ToListAsync();
            return new ListResultDto<ModeListDto>(ObjectMapper.Map<List<ModeListDto>>(modes));
        }
    }
}

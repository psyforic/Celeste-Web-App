using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Celeste.Modes.UserModes;
using Celeste.UserModes.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.UserModes
{
    public class UserModesAppService : AsyncCrudAppService<UserMode, UserModeListDto, Guid, PagedResultRequestDto, CreateUserMode, GetUserModeOutput>, IUserModesAppService
    {
        private readonly UserModesManager _useModeManager;
        private readonly IRepository<UserMode, Guid> _userModerepository;

        public UserModesAppService(
            UserModesManager userModeManager,
            IRepository<UserMode, Guid> userModeRepository
            ) : base(userModeRepository)
        {
            _useModeManager = userModeManager;
            _userModerepository = userModeRepository;
        }
    }
}

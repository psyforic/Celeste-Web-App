using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using Celeste.UserModes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes.UserModes
{
    public class UserModesManager : DomainService, IUserModesManager
    {
        private IRepository<UserMode, Guid> _userModeRepo;

        public UserModesManager(IRepository<UserMode, Guid> userModeRepo)
        {
            _userModeRepo = userModeRepo;
        }

        public async Task<UserMode> CreateAsync(UserMode userMode)
        {
            return await _userModeRepo.InsertAsync(userMode);
        }

        public async Task Delete(Guid id)
        {
            var userMode = await _userModeRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (userMode == null)
            {
                throw new UserFriendlyException("The Mode Cannot be found");
            }
            else
            {
                await _userModeRepo.DeleteAsync(userMode);
            }
        }

        public async Task<UserMode> GetAsync(Guid id)
        {
            var userMode = await _userModeRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (userMode == null)
            {
                throw new UserFriendlyException("The Mode Cannot be found");
            }
            return userMode;
        }

        public async Task UpdateAsync(UserMode userMode)
        {
            await _userModeRepo.UpdateAsync(userMode);
        }
    }
}

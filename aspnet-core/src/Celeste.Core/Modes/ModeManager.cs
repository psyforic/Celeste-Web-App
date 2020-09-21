using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes
{
    public class ModeManager : DomainService, IModeManager
    {
        private IRepository<Mode, Guid> _modeRepo;

        public ModeManager(IRepository<Mode, Guid> modeRepo)
        {
            _modeRepo = modeRepo;
        }
        public async Task<Mode> CreateAsync(Mode mode)
        {
            return await _modeRepo.InsertAsync(mode);
        }

        public async Task Delete(Guid id)
        {
            var mode = await _modeRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (mode == null)
            {
                throw new UserFriendlyException("The Mode Cannot be found");
            }
            else
            {
                await _modeRepo.DeleteAsync(mode);
            }
        }

        public async Task<Mode> GetAsync(Guid id)
        {
            var mode = await _modeRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (mode == null)
            {
                throw new UserFriendlyException("The Mode Cannot be found");
            }
            return mode;
        }

        public async Task UpdateAsync(Mode mode)
        {
            await _modeRepo.UpdateAsync(mode);
        }
    }
}

using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes
{
    public interface IModeManager : IDomainService
    {
        Task<Mode> GetAsync(Guid id);
        Task<Mode> CreateAsync(Mode mode);
        Task UpdateAsync(Mode mode);
        Task Delete(Guid id);
    }
}

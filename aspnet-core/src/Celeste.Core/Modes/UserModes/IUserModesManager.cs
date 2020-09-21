using Abp.Domain.Services;
using Celeste.UserModes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes.UserModes
{
    public interface IUserModesManager : IDomainService
    {
        Task<UserMode> GetAsync(Guid id);
        Task<UserMode> CreateAsync(UserMode userMode);
        Task UpdateAsync(UserMode userMode);
        Task Delete(Guid id);
    }
}

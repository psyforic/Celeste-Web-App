using System.Threading.Tasks;
using Abp.Application.Services;
using Celeste.Authorization.Accounts.Dto;

namespace Celeste.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}

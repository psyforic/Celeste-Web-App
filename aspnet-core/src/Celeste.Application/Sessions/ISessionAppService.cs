using System.Threading.Tasks;
using Abp.Application.Services;
using Celeste.Sessions.Dto;

namespace Celeste.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

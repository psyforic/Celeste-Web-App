using Celeste.MultiTenancy;
using System.Threading.Tasks;

namespace Celeste.Notifications
{
    public interface IAppNotifier
    {
        Task NewTenantRegisteredAsync(Tenant tenant);
    }
}
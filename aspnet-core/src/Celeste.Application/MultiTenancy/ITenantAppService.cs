using Abp.Application.Services;
using Celeste.MultiTenancy.Dto;

namespace Celeste.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}


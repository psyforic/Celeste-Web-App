using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Configuration.Startup;
using Abp.Domain.Repositories;
using Abp.Localization;
using Celeste.MultiTenancy.Dto;
using Celeste.Notifications;
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.MultiTenancy
{
   public class TenantRegistrationAppService: AsyncCrudAppService<Tenant, TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>, ITenantRegistrationAppService
    {
        private readonly TenantManager _tenantManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;

        private readonly ILocalizationContext _localizationContext;
        public TenantRegistrationAppService(
              IRepository<Tenant, int> repository,
                     TenantManager tenantManager,
                  IMultiTenancyConfig multiTenancyConfig,
                               ILocalizationContext localizationContext
            ):base(repository)
        {
            _tenantManager = tenantManager;
        
        }
        public async Task<TenantDto> RegisterTenantAsync(RegisterTenantInput input)
        {
            CheckCreatePermission();
            // We are working entities of new tenant, so changing tenant filter
            
                var tenantId = await _tenantManager.CreateWithAdminUserAsync(
                   input.TenancyName,
                   input.Name,
                   input.FirstName,
                   input.LastName,
                   input.Password,
                   input.AdminEmailAddress,
                   null,
                   false
               );

                var tenant = await _tenantManager.GetByIdAsync(tenantId);
             //   await _appNotifier.NewTenantRegisteredAsync(tenant);
          
                //send an email here
                return MapToEntityDto(tenant);
            
        }
    }
}

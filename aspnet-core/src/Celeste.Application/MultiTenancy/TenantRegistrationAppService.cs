using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Configuration.Startup;
using Abp.Domain.Repositories;
using Abp.Localization;
using Celeste.MultiTenancy.Dto;
using Celeste.Notifications;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.MultiTenancy
{
   public class TenantRegistrationAppService: AsyncCrudAppService<Tenant, TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>, ITenantRegistrationAppService
    {
        private readonly TenantManager _tenantManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        private readonly IWebHostEnvironment _environment;
        private readonly ILocalizationContext _localizationContext;
        public TenantRegistrationAppService(
                  IRepository<Tenant, int> repository,
                  TenantManager tenantManager,
                  IWebHostEnvironment environment,
                  IMultiTenancyConfig multiTenancyConfig,
                  ILocalizationContext localizationContext
            ):base(repository)
        {
            _tenantManager = tenantManager;
            _environment = environment;

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
                   true
               );

                var tenant = await _tenantManager.GetByIdAsync(tenantId);
            //   await _appNotifier.NewTenantRegisteredAsync(tenant);

            //send an email here
            string body = string.Empty;

            //using streamreader for reading my html template   

            var path = Path.Combine(_environment.WebRootPath, "EmailTemplate/new-registration.html");

            using (StreamReader reader = new StreamReader(path))
            {
                body = reader.ReadToEnd();
            }

            string link = "http://localhost:4200/";
            body = body.Replace("#Link", link);
            if (tenant != null)
                body = body.Replace("#Domain", tenant.TenancyName);
            Emailer.Send(to: input.Email, subject: "Celeste New Account!", body: body, isBodyHtml: true);

            return MapToEntityDto(tenant);
            
        }
    }
}

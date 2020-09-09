using Celeste.MultiTenancy.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.MultiTenancy
{
   public interface ITenantRegistrationAppService
    {
        Task<TenantDto> RegisterTenantAsync(RegisterTenantInput input);
    }
}

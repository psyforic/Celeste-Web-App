using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace Celeste.Controllers
{
    public abstract class CelesteControllerBase: AbpController
    {
        protected CelesteControllerBase()
        {
            LocalizationSourceName = CelesteConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

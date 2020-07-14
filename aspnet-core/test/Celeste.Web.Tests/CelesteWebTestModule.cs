using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Celeste.EntityFrameworkCore;
using Celeste.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace Celeste.Web.Tests
{
    [DependsOn(
        typeof(CelesteWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class CelesteWebTestModule : AbpModule
    {
        public CelesteWebTestModule(CelesteEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(CelesteWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(CelesteWebMvcModule).Assembly);
        }
    }
}
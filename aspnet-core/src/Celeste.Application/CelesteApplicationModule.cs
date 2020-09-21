using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Celeste.Authorization;

namespace Celeste
{
    [DependsOn(
        typeof(CelesteCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class CelesteApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<CelesteAuthorizationProvider>();
            Configuration.Modules.AbpAutoMapper().Configurators.Add(CustomDtoMapper.CreateMappings);
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(CelesteApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}

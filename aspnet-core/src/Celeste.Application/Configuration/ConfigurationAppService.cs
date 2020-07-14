using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using Celeste.Configuration.Dto;

namespace Celeste.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : CelesteAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

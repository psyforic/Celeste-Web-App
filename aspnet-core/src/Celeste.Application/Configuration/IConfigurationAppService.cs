using System.Threading.Tasks;
using Celeste.Configuration.Dto;

namespace Celeste.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

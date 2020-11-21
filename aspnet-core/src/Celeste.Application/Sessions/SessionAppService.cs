using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Auditing;
using Celeste.Sessions.Dto;

namespace Celeste.Sessions
{
    public class SessionAppService : CelesteAppServiceBase, ISessionAppService
    {
        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>()
                }
            };

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = ObjectMapper.Map<TenantLoginInfoDto>(await GetCurrentTenantAsync());
            }

            if (AbpSession.UserId.HasValue)
            {
                var user = await GetCurrentUserAsync();
                List<string> roles = new List<string>();
                if (user.Roles != null)
                {
                    var roleIds = user.Roles.Select(x => x.RoleId).ToArray();
                    roles = RolesManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName).ToList(); ;
                }


                output.User = ObjectMapper.Map<UserLoginInfoDto>(user);
                output.User.RoleNames = roles;
                output.User = ObjectMapper.Map<UserLoginInfoDto>(await GetCurrentUserAsync());
            }

            return output;
        }
    }
}

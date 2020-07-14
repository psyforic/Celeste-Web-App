using Abp.Authorization;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;

namespace Celeste.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

using Abp.MultiTenancy;
using Celeste.Authorization.Users;
using System.Collections.Generic;

namespace Celeste.MultiTenancy
{
    public class Tenant : AbpTenant<User>
    {

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }

        public virtual ICollection<User> Users { get; set; }
        public Tenant()
        {            
        }

        public Tenant(string tenancyName, string name)
            : base(tenancyName, name)
        {
        }
    }
}

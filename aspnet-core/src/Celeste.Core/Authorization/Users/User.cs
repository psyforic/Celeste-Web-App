using System;
using System.Collections.Generic;
using Abp.Authorization.Users;
using Abp.Extensions;
using Celeste.Modes;
using Celeste.UserModes;

namespace Celeste.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public const string DefaultPassword = "123qwe";
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Suburb { get; set; }
        public string PostalCode { get; set; }
        public List<UserMode> UserModes { get; set; }
        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress, string name = "admin",
            string surname = "admin", string username = "admin")
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = username,
                Name = name,
                Surname = surname,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }
    }
}

using Abp.Authorization.Users;
using Abp.MultiTenancy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Celeste.MultiTenancy.Dto
{
   public class RegisterTenantInput
    {
        [Required]
        [StringLength(AbpTenantBase.MaxTenancyNameLength)]
        [RegularExpression(AbpTenantBase.TenancyNameRegex)]
        public string TenancyName { get; set; }

        public string Name { get; set; }

        [Required]
        [StringLength(AbpTenantBase.MaxNameLength)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(AbpTenantBase.MaxNameLength)]
        public string LastName { get; set; }


        [Required]
        [StringLength(AbpTenantBase.MaxNameLength)]
        public string Password { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string AdminEmailAddress { get; set; }

        [StringLength(AbpTenantBase.MaxConnectionStringLength)]
        public string ConnectionString { get; set; }

        public bool IsActive { get; set; }

        public string Email { get; set; }
    }
}

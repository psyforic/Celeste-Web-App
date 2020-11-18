using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Runtime.Validation;
using Celeste.Authorization.Users;
using Celeste.Modes.Dto;
using Celeste.UserModes.Dto;

namespace Celeste.Users.Dto
{
   // [AutoMapTo(typeof(User))]
    public class CreateUserDto : IShouldNormalize
    {
        [Required]
        [StringLength(AbpUserBase.MaxUserNameLength)]
        public string UserName { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public bool IsActive { get; set; }

        public string[] RoleNames { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Suburb { get; set; }
        public string PostalCode { get; set; }
        public string CellphoneNumber { get; set; }
        public virtual List<UserModeListDto> UserModes { get; set; }

        //[Required]
        //[StringLength(AbpUserBase.MaxPlainPasswordLength)]
        //[DisableAuditing]
        public string Password { get; set; }

        public void Normalize()
        {
            if (RoleNames == null)
            {
                RoleNames = new string[0];
            }
        }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Celeste.Authorization.Users;
using System.Collections.Generic;

namespace Celeste.Sessions.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public List<string> RoleNames { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public bool isAdmin()
        {
            return RoleNames.Contains("ADMIN");
        }

    }
}

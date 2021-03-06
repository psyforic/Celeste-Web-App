using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.UserModes.Dto
{
    [AutoMapFrom(typeof(UserMode))]
    public class CreateUserMode : EntityDto<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public Guid ModeId { get; set; }
        public long UserId { get; set; }
    }
}

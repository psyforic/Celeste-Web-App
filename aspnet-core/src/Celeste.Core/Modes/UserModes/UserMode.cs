using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Celeste.Authorization.Users;
using Celeste.Modes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Celeste.UserModes
{
    public class UserMode : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set; }

       
        [ForeignKey(nameof(UserId))]
        public long UserId { get; set; }
        public User User { get; set; }

        [ForeignKey(nameof(ModeId))]
        public Guid ModeId { get; set; }
        public Mode Mode { get; set; }
    }
}

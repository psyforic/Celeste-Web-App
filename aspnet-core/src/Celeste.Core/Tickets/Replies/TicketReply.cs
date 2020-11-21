using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Celeste.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Celeste.Tickets
{
    public class TicketReply : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set ; }
        public Guid TicketId { get; set; }
        public long UserId { get; set; }
        public string Body { get; set; }
        [ForeignKey(nameof(TicketId))]
        public Ticket Ticket { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}

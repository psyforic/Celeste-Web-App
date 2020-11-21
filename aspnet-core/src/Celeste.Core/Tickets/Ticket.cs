using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Celeste.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Celeste.Tickets
{
    public class Ticket : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set ; }
        public long UserId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public TicketStatus Status { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
        public ICollection<TicketReply> Replies { get; set; }
    }
}

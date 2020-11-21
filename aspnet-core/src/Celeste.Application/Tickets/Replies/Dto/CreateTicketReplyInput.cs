using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    [AutoMapFrom(typeof(TicketReply))]
    public class CreateTicketReplyInput
    {
        public Guid TicketId { get; set; }
        public int TenantId { get; set; }
        public TicketStatus TicketStatus { get; set; }
        public string Body { get; set; }
    }
}

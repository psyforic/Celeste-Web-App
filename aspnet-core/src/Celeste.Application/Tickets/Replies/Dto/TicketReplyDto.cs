using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    public class TicketReplyDto: AuditedEntityDto<Guid>
    {
        public Guid TicketId { get; set; }
        public TicketStatus TicketStatus { get; set; }
        public string Body { get; set; }
    }
}

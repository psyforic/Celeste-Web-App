using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Celeste.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    [AutoMapTo(typeof(Ticket))]
    public class TicketDto: AuditedEntityDto<Guid>
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public TicketStatus Status { get; set; }
    }
}

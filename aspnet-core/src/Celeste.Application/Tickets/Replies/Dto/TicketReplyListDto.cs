using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Celeste.Tickets;
using Celeste.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    [AutoMapFrom(typeof(TicketReply))]
    public class TicketReplyListDto: AuditedEntityDto<Guid>
    {
        public int TenantId { get; set; }
        public Guid TicketId { get; set; }
        public long UserId { get; set; }
        public string Body { get; set; }
        public TicketDto Ticket { get; set; }
        public TicketStatus TicketStatus { get; set; }
        public UserDto User { get; set; }
    }
}

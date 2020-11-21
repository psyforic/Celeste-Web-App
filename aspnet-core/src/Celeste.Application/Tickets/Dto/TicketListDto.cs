using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Celeste.Users.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    [AutoMapTo(typeof(Ticket))]
    public class TicketListDto: AuditedEntityDto<Guid>
    {
        public int TenantId { get; set; }
        public long UserId { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string Status { get; set; }
        public UserDto User { get; set; }
        public List<TicketReplyListDto> Replies { get; set; }
    }
}

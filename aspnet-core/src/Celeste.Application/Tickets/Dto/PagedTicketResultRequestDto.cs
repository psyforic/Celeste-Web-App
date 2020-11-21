using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    public class PagedTicketResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public TicketStatus? Status { get; set; }
        public long? UserId { get; set; }
        public int? TenantId { get; set; }
    }
}

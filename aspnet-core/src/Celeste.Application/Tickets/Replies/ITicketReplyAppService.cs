using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets.Replies
{
    public interface ITicketReplyAppService: IApplicationService
    {
        Task<TicketReplyListDto> GetAsync(Guid id);
        Task<TicketReplyListDto> CreateAsync(CreateTicketReplyInput replyInput);
        Task UpdateAsync(TicketReplyListDto input);
        Task DeleteAsync(Guid id);
    }
}

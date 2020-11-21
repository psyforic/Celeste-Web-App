using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets.Replies
{
    public interface ITicketReplyManager: IDomainService
    {
        Task<TicketReply> GetAsync(Guid id);
        Task<TicketReply> CreateAsync(TicketReply ticketReply);
        Task UpdateAsync(TicketReply ticket);
        Task DeleteAsync(Guid id);
    }
}

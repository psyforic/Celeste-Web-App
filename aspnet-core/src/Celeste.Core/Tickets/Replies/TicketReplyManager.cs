using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets.Replies
{
    public class TicketReplyManager : ITicketReplyManager
    {
        private readonly IRepository<TicketReply, Guid> _ticketReplyRepository;

        public TicketReplyManager(IRepository<TicketReply, Guid> ticketReplyRepository)
        {
            _ticketReplyRepository = ticketReplyRepository;
        }
        public async Task<TicketReply> CreateAsync(TicketReply ticketReply)
        {
            return await _ticketReplyRepository.InsertAsync(ticketReply);
        }

        public async Task DeleteAsync(Guid id)
        {
            var ticketReply = await _ticketReplyRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (ticketReply == null)
            {
                throw new UserFriendlyException("The Ticket Reply Cannot be found");
            }
            else
            {
                await _ticketReplyRepository.DeleteAsync(ticketReply);
            }
        }

        public async Task<TicketReply> GetAsync(Guid id)
        {
            var ticketReply = await _ticketReplyRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (ticketReply == null)
            {
                throw new UserFriendlyException("The Ticket Reply Cannot be found");
            }
            return ticketReply;
        }

        public async Task UpdateAsync(TicketReply ticketReply)
        {
            await _ticketReplyRepository.UpdateAsync(ticketReply);
        }
    }
}

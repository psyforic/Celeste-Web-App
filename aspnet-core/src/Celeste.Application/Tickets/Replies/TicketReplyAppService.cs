using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets.Replies
{
    public class TicketReplyAppService : CelesteAppServiceBase, ITicketReplyAppService
    {
        private readonly IRepository<TicketReply, Guid> _ticketReplyRepository;
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly ITicketReplyManager _ticketReplyManager;
        public TicketReplyAppService(
            IRepository<TicketReply, Guid> ticketReplyRepository,
            IRepository<Ticket, Guid> ticketRepository,
            ITicketReplyManager ticketReplyManager)
        {
            _ticketReplyRepository = ticketReplyRepository;
            _ticketReplyManager = ticketReplyManager;
            _ticketRepository = ticketRepository;
        }
        public async Task<TicketReplyListDto> CreateAsync(CreateTicketReplyInput replyInput)
        {
            var ticket = await _ticketRepository.FirstOrDefaultAsync(replyInput.TicketId);
            if(ticket != null)
            {
                var ticketReply = ObjectMapper.Map<TicketReply>(replyInput);
                ticketReply.UserId = AbpSession.UserId.Value;
                ticket.Status = replyInput.TicketStatus;
                await _ticketRepository.UpdateAsync(ticket);
                return ObjectMapper.Map<TicketReplyListDto>(await _ticketReplyManager.CreateAsync(ticketReply));
            }
            throw new UserFriendlyException("Ticket Not Found");
           
        }

        public async Task DeleteAsync(Guid id)
        {
            await _ticketReplyManager.DeleteAsync(id);
        }

        public async Task<TicketReplyListDto> GetAsync(Guid id)
        {
            return ObjectMapper.Map<TicketReplyListDto>(await _ticketReplyManager.GetAsync(id));
        }

        public async Task UpdateAsync(TicketReplyListDto input)
        {
            var ticketReply = await _ticketReplyManager.GetAsync(input.Id);
            var ticket = await _ticketRepository.FirstOrDefaultAsync(ticketReply.TicketId);
            if(ticket != null)
            {
                var id = ticketReply.Id;
                ticketReply.Body = input.Body;
                ticketReply.Id = id;
                await _ticketReplyManager.UpdateAsync(ticketReply);
                ticket.Status = input.TicketStatus;
                await _ticketRepository.UpdateAsync(ticket);
            }
            
        }
    }
}

using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets
{
    public class TicketManager : ITicketManager
    {
        private readonly IRepository<Ticket, Guid> _ticketRespository;
        public TicketManager(IRepository<Ticket, Guid> ticketRespository)
        {
            _ticketRespository = ticketRespository;
        }
        public async Task<Ticket> CreateAsync(Ticket ticket)
        {
            return await _ticketRespository.InsertAsync(ticket);
        }

        public async Task Delete(Guid id)
        {
            var ticket = await _ticketRespository.FirstOrDefaultAsync(x => x.Id == id);
            if (ticket == null)
            {
                throw new UserFriendlyException("The Ticket Cannot be found");
            }
            else
            {
                await _ticketRespository.DeleteAsync(ticket);
            }
        }

        public async Task<Ticket> GetAsync(Guid id)
        {
            var ticket = await _ticketRespository.FirstOrDefaultAsync(x => x.Id == id);
            if (ticket == null)
            {
                throw new UserFriendlyException("The Ticket Cannot be found");
            }
            return ticket;
        }

        public async Task UpdateAsync(Ticket ticket)
        {
            await _ticketRespository.UpdateAsync(ticket);
        }
    }
}

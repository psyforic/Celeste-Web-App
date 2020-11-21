using Abp.Application.Services;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets
{
    public interface ITicketManager: IDomainService
    {
        Task<Ticket> GetAsync(Guid id);
        Task<Ticket> CreateAsync(Ticket ticket);
        Task UpdateAsync(Ticket ticket);
        Task Delete(Guid id);
    }
}

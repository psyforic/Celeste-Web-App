using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;
using Celeste.Sessions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Tickets
{
    public class TicketAppService : AsyncCrudAppService<Ticket, TicketListDto, Guid, PagedResultRequestDto, CreateTicketInput, TicketDto>, ITicketAppService
    {
        private readonly IRepository<Ticket, Guid> _ticketRepository;
        private readonly ITicketManager _ticketManager;
        private readonly RoleManager _rolesManager;
        private readonly IRepository<User, long> _userRepository;
        public TicketAppService(
            IRepository<Ticket, Guid> ticketRepository,
            ITicketManager ticketManager,
            RoleManager rolesManager,
            IRepository<User, long> userRepository) : base(ticketRepository)
        {
            _ticketManager = ticketManager;
            _ticketRepository = ticketRepository;
            _rolesManager = rolesManager;
            _userRepository = userRepository;
        }

        public async override Task<TicketListDto> CreateAsync(CreateTicketInput input)
        {
            var ticket = ObjectMapper.Map<Ticket>(input);
            ticket.UserId = AbpSession.UserId.Value;
            ticket.Status = TicketStatus.PENDING;
            return ObjectMapper.Map<TicketListDto>(await _ticketManager.CreateAsync(ticket));
        }
        public override Task<TicketListDto> UpdateAsync(TicketDto input)
        {
            return base.UpdateAsync(input);
        }
        public async Task<PagedResultDto<TicketListDto>> GetTickets(PagedTicketResultRequestDto input)
        {
           
            List<Ticket> tickets = await CreateFilteredQuery(input);
            var totalCount = tickets.ToList().Count;
            var mappedTickets = ObjectMapper.Map<List<TicketListDto>>(tickets);
            mappedTickets = mappedTickets.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            mappedTickets.ForEach(x =>
            {
                x.Status = x.Status.ToString();
            });
            return new PagedResultDto<TicketListDto>(totalCount, mappedTickets);
        }
        public async override Task<TicketListDto> GetAsync(EntityDto<Guid> input)
        {
            using(CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant, AbpDataFilters.MustHaveTenant))
            {
                var ticket = await _ticketRepository.GetAll()
                .Include(x => x.User)
                .Include(x => x.Replies)
                .ThenInclude(x => x.User)
                .Where(x => x.Id.Equals(input.Id))
                .FirstOrDefaultAsync();
                var mappedTicket = ObjectMapper.Map<TicketListDto>(ticket);
                return mappedTicket;
            }
            
        }
        public override Task DeleteAsync(EntityDto<Guid> input)
        {
            return base.DeleteAsync(input);
        }
        private async Task<List<Ticket>> CreateFilteredQuery(PagedTicketResultRequestDto input)
        {
            List<Ticket> tickets = new List<Ticket>();
           
           
            if (AbpSession.TenantId == null)
            {
                
                using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant, AbpDataFilters.MustHaveTenant))
                {

                    tickets =  _ticketRepository.GetAll()
                    .Include(x => x.User)
                    .Include(x => x.Replies)
                    .ThenInclude(x => x.User)
                    .WhereIf(!input.Keyword.IsNullOrWhiteSpace(), x => x.User.UserName.Contains(input.Keyword) ||
                    x.User.Name.Contains(input.Keyword) ||
                    x.User.EmailAddress.Contains(input.Keyword) ||
                    x.User.Surname.Contains(input.Keyword))
                    .WhereIf(input.Status.HasValue && input.Status >= 0, x => x.Status == input.Status)
                    .WhereIf(input.Status.HasValue && input.Status < 0, x => x.Status >= 0)
                    .WhereIf(input.UserId.HasValue && input.UserId > 0, x => x.UserId == input.UserId)
                    .WhereIf(input.TenantId.HasValue && input.TenantId > 0, x => x.TenantId == input.TenantId).ToList();

                }
            }
            else
            {
                List<string> roles = null;
                var user = await _userRepository.GetAllIncluding(x=>x.Roles).Where(x =>x.Id == AbpSession.UserId.Value).FirstOrDefaultAsync();
                if(user != null)
                {
                    if (user.Roles != null)
                    {
                        var roleIds = user.Roles.Select(x => x.RoleId).ToArray();
                        roles = await _rolesManager.Roles.Where(r => roleIds.Contains(r.Id)).Select(r => r.NormalizedName).ToListAsync(); ;
                    }
                    if (roles != null && roles.Contains("ADMIN"))
                    {
                        tickets = _ticketRepository.GetAll()
                        .Include(x => x.User).Include(x => x.Replies).ThenInclude(x => x.User)
                        .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                        x => x.User.UserName.Contains(input.Keyword) ||
                        x.User.Name.Contains(input.Keyword) ||
                        x.User.EmailAddress.Contains(input.Keyword) ||
                        x.User.Surname.Contains(input.Keyword))
                        .WhereIf(input.Status.HasValue && input.Status >= 0, x => x.Status == input.Status)
                        .WhereIf(input.Status.HasValue && input.Status < 0, x => x.Status >= 0)
                        .WhereIf(input.UserId.HasValue && input.UserId > 0, x => x.UserId == input.UserId).ToList();
                    }
                    else
                    {
                        tickets = _ticketRepository.GetAll()
                        .Include(x => x.User).Include(x => x.Replies).ThenInclude(x => x.User)
                        .WhereIf(!input.Keyword.IsNullOrWhiteSpace(),
                         x => x.User.UserName.Contains(input.Keyword) ||
                         x.User.Name.Contains(input.Keyword) ||
                         x.User.EmailAddress.Contains(input.Keyword) ||
                         x.User.Surname.Contains(input.Keyword))
                        .Where(x => x.UserId == AbpSession.UserId)
                        .WhereIf(input.Status.HasValue && input.Status >= 0, x => x.Status == input.Status)
                        .WhereIf(input.Status.HasValue && input.Status < 0, x => x.Status >= 0)
                        .WhereIf(input.UserId.HasValue && input.UserId > 0, x => x.UserId == input.UserId).ToList();
                    }
                }
                
               
            }

            return tickets;

        }
    }
}

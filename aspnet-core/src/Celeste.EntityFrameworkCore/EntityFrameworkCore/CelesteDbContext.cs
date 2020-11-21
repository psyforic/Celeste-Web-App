using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;
using Celeste.MultiTenancy;
using Celeste.Modes;
using Celeste.UserModes;
using Celeste.Tickets;

namespace Celeste.EntityFrameworkCore
{
    public class CelesteDbContext : AbpZeroDbContext<Tenant, Role, User, CelesteDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Mode> Modes { get; set; }
        public DbSet<ModeStats> ModeStats { get; set; }

        public DbSet<UserMode> UserModes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketReply> TicketReplies { get; set; }
        public CelesteDbContext(DbContextOptions<CelesteDbContext> options)
            : base(options)
        {
        }
    }
}

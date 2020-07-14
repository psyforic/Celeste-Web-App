using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Celeste.Authorization.Roles;
using Celeste.Authorization.Users;
using Celeste.MultiTenancy;

namespace Celeste.EntityFrameworkCore
{
    public class CelesteDbContext : AbpZeroDbContext<Tenant, Role, User, CelesteDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public CelesteDbContext(DbContextOptions<CelesteDbContext> options)
            : base(options)
        {
        }
    }
}

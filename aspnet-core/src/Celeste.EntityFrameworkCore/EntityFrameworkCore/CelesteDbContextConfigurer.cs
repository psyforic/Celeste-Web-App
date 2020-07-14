using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace Celeste.EntityFrameworkCore
{
    public static class CelesteDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<CelesteDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<CelesteDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}

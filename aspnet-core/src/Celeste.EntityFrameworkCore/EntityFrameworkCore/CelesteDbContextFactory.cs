using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Celeste.Configuration;
using Celeste.Web;

namespace Celeste.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class CelesteDbContextFactory : IDesignTimeDbContextFactory<CelesteDbContext>
    {
        public CelesteDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<CelesteDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            CelesteDbContextConfigurer.Configure(builder, configuration.GetConnectionString(CelesteConsts.ConnectionStringName));

            return new CelesteDbContext(builder.Options);
        }
    }
}

using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Celeste.Modes
{
    public interface IModeAppService : IApplicationService
    {
        public Task AddSelectedMode(int tenantId, Guid modeId);
    }
}

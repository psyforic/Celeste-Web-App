using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Modes.Dto
{
    [AutoMapFrom(typeof(Mode))]
    public class GetModeOutput : EntityDto<Guid>
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Name { get; set; }
        public string Command { get; set; }
        public string Icon { get; set; }
    }
}

using Abp.AutoMapper;
using Celeste.Modes;
using Celeste.Modes.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.MultiTenancy.CelesteDashboard.Dto
{
    [AutoMapFrom(typeof(ModeStats))]
   public class ModeStatsDto
    {
        public string Name { get; set; }
        public int Position { get; set; }
        public DateTime Date { get; set; }
        public int Count { get; set; }

    }
}

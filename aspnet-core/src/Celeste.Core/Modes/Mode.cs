using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Celeste.Modes
{
    [Table("Mode")]
    public class Mode : Entity<Guid>
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Name { get; set; }
        public string Command { get; set; }
        public string Icon { get; set; }
        public DateTime CreationTime { get; set; }
    }
}

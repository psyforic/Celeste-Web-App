using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Celeste.Modes
{
    [Table("AppModeStat")]
    public class ModeStats : FullAuditedEntity<Guid>, IMustHaveTenant
    {
        public int TenantId { get; set; }
        public Guid ModeId { get; set; }
        [ForeignKey(nameof(ModeId))]
        public Mode Mode { get; set; }
        public int Count { get; set; }
        public DateTime Time { get; set; }
    }
}

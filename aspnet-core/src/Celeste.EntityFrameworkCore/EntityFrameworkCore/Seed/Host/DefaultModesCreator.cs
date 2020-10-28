using Celeste.Modes;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Celeste.EntityFrameworkCore.Seed.Host
{
   public class DefaultModesCreator
    {
        private readonly CelesteDbContext _context;

        public DefaultModesCreator(CelesteDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateModes();
        }
   
        private void CreateModes()
        {
            var countModes = _context.Modes.Count();
            if (countModes == 0)
            {
                List<Mode> modes = new List<Mode>() {
                    new Mode
                    {
                      Command="<<100",
                      Name="Sunrise",
                      StartTime="06:00",
                      EndTime="09:00",
                    },
                    new Mode
                    {
                      Command="<<200",
                      Name="Mid-Morning",
                      StartTime="09:00",
                      EndTime="12:00",
                    },
                    new Mode
                    {
                      Command="<<300",
                      Name="Mid-Day",
                      StartTime="12:00",
                      EndTime="15:00",
                    },
                    new Mode
                    {
                      Command="<<400",
                      Name="Sunset",
                      StartTime="15:00",
                      EndTime="18:00",
                    },
                    new Mode
                    {
                      Command="<<f00",
                      Name="Therapy",
                    },
                };
                _context.Modes.AddRange(modes);
                _context.SaveChanges();

                /* Add desired features to the standard edition, if wanted... */
            }
        }
    }
}

using Abp.AutoMapper;
using Celeste.Modes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Celeste.Tickets
{
    [AutoMapFrom(typeof(Ticket))]
    public class CreateTicketInput
    {
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}

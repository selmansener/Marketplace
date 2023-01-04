using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Functions.EventHandlers.Events
{
    internal class BaseEvent
    {
        public string PublisherId { get; set; }

        public string Version { get; set; }

        public DateTime PublishedAt { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Infrastructure.Azure.Extensions.Configurations;
using Marketplace.Infrastructure.Shared.Configurations;

namespace Marketplace.Functions.EventHandlers.Configurations
{
    public class ConfigurationOptions
    {
        public DbConnectionOptions ModilistDbConnectionOptions { get; set; }

        public string AppStorage { get; set; }

        public EventGridClientOptions EventGridClientOptions { get; set; }

        public ElasticSearchOptions ElasticSearch { get; set; }
    }
}

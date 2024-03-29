﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Business.Seed.Services;

namespace Marketplace.Business.Seed.Configuration
{
    internal sealed class SeedServices : Dictionary<string, Type>
    {
        public ISeedService GetService(IServiceProvider serviceProvider, SeedServiceType service)
        {
            var serviceName = service.ToString();
            if (!ContainsKey(serviceName))
            {
                throw new InvalidOperationException($"Invalid seed service: {serviceName}");
            }

            return (ISeedService)serviceProvider.GetService(this[serviceName]);
        }
    }
}

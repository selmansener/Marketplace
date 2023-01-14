using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Extensions.DependencyInjection;

using Marketplace.Business.Utils.AddressDomain;
using Marketplace.Business.Utils.Messages;

namespace Marketplace.Business.Utils.Extensions
{
    public static class BusinessUtilExtensions
    {
        public static IServiceCollection AddBusinessUtils(this IServiceCollection services)
        {
            services.AddSingleton<IAddressService, AddressService>();
            services.AddHttpClient<IMailProvider, MailProvider>();

            return services;
        }
    }
}

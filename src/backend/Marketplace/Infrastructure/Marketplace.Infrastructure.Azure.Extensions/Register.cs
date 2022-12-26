using Microsoft.Extensions.DependencyInjection;

using Marketplace.Infrastructure.Azure.Extensions.BlobStorage;
using Marketplace.Infrastructure.Azure.Extensions.EventGrid;

namespace Marketplace.Infrastructure.Azure.Extensions
{
    public static class Register
    {
        public static IServiceCollection AddBlobClientFactory(this IServiceCollection services)
        {
            services.AddScoped<IBlobClientFactory, BlobClientFactory>();
            services.AddScoped<IEventGridPublisherClientFactory, EventGridPublisherClientFactory>();

            return services;
        }
    }
}
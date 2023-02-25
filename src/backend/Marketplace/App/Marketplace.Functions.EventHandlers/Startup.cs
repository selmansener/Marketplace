using System;
using System.IO;
using System.Text;

using Marketplace.Data.Extensions;
using Marketplace.Functions.EventHandlers.Configurations;
using Marketplace.Infrastructure.Azure.Extensions;
using Marketplace.Infrastructure.Azure.Extensions.Configurations;
using Marketplace.Infrastructure.Shared.Configurations;

using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Modilist.Business.Extensions;

using Newtonsoft.Json;

[assembly: FunctionsStartup(typeof(Marketplace.Functions.EventHandlers.Startup))]
namespace Marketplace.Functions.EventHandlers
{
    internal class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var options = GetConfigurations(env);

            builder.Services.Configure<StorageConnectionStrings>(config =>
            {
                config.AppStorage = options.AppStorage;
            });

            builder.Services.Configure<EventGridClientOptions>(config =>
            {
                config.Secret = options.EventGridClientOptions.Secret;
                config.Url = options.EventGridClientOptions.Url;
            });

            builder.Services.Configure<ElasticSearchOptions>(config =>
            {
                config.BaseUrl = options.ElasticSearch.BaseUrl;
                config.APIKey = options.ElasticSearch.APIKey;
            });

            builder.Services.AddBlobClientFactory();
            var environment = builder.Services.BuildServiceProvider().GetService<IHostEnvironment>();

            builder.Services.AddDataAccess(options.ModilistDbConnectionOptions, environment);

            builder.Services.AddRepositories();

            builder.Services.AddCQRS();

            builder.Services.AddLoggingBehavior();

            builder.Services.AddValidationBehavior();

            builder.Services.AddTransactionBehavior();

            builder.Services.AddTransactionManager();

            builder.Services.BuildServiceProvider();
        }

        public ConfigurationOptions GetConfigurations(string environmentName)
        {
            var assembly = typeof(Startup).Assembly;
            using (var stream = assembly.GetManifestResourceStream($"ModilistPortal.Functions.EventHandlers.Settings.appsettings.{environmentName}.json"))
            using (var reader = new StreamReader(stream, Encoding.UTF8))
            {
                string options = reader.ReadToEnd();
                if (string.IsNullOrEmpty(options))
                {
                    throw new InvalidOperationException($"Could not load appsettings file.");
                }

                return JsonConvert.DeserializeObject<ConfigurationOptions>(options);
            }
        }
    }
}

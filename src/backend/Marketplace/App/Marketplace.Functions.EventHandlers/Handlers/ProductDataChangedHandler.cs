using System;
using System.Threading;
using System.Threading.Tasks;

using Azure.Messaging.EventGrid;

using Elasticsearch.Net;

using Marketplace.Business.CQRS.ProductDomain.Queries;
using Marketplace.Functions.EventHandlers.Exceptions;
using Marketplace.Infrastructure.Shared.Configurations;
using Marketplace.Infrastructure.Shared.Events;

using MediatR;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Nest;

using Newtonsoft.Json;

namespace Marketplace.Functions.EventHandlers.Handlers
{
    internal class ProductDataChangedHandler
    {
        private readonly ElasticClient _elasticClient;
        private readonly IMediator _mediator;

        public ProductDataChangedHandler(IOptions<ElasticSearchOptions> elasticSearchOptions, IMediator mediator)
        {
            var credentials = new ApiKeyAuthenticationCredentials(elasticSearchOptions.Value.APIKey);
            _elasticClient = new ElasticClient(elasticSearchOptions.Value.CloudId, credentials);
            _mediator = mediator;
        }

        [FunctionName(nameof(ProductDataChangedHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger logger, CancellationToken cancellationToken)
        {
            var productDataChanged = JsonConvert.DeserializeObject<ProductDataChanged>(eventGridEvent.Data.ToString());

            try
            {
                var productData = await _mediator.Send(new GetProduct(productDataChanged.ProductId), cancellationToken);

                var response = _elasticClient.Index(productData, request => request.Index("products"));

                if (!response.IsValid)
                {
                    throw new IndexingProductFailureException(productDataChanged.ProductId, response.DebugInformation);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Indexing product failed for: {ProductId}", productDataChanged.ProductId);
            }
        }
    }
}

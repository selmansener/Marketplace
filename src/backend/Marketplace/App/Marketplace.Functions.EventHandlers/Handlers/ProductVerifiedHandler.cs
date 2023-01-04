using System;
using System.Threading;
using System.Threading.Tasks;

using Azure.Messaging.EventGrid;

using Marketplace.Business.CQRS.ProductDomain.Commands;
using Marketplace.Functions.EventHandlers.Events;

using MediatR;

using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.EventGrid;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

namespace Marketplace.Functions.EventHandlers.Handlers
{
    internal class ProductVerifiedHandler
    {
        private readonly IMediator _mediator;

        public ProductVerifiedHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        [FunctionName(nameof(ProductVerifiedHandler))]
        public async Task RunAsync([EventGridTrigger] EventGridEvent eventGridEvent, ILogger logger, CancellationToken cancellationToken)
        {
            var productVerified = JsonConvert.DeserializeObject<ProductVerified>(eventGridEvent.Data.ToString());

            try
            {
                await _mediator.Send(new UpsertProduct(
                    productVerified.PortalProductId,
                    productVerified.TenantId,
                    productVerified.Name,
                    productVerified.SKU,
                    productVerified.Barcode,
                    productVerified.Brand,
                    productVerified.Category,
                    productVerified.Price,
                    productVerified.SalesPrice,
                    productVerified.TaxRatio,
                    productVerified.State,
                    productVerified.StockAmount), cancellationToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"CreateProduct failed for with Id: {productVerified.PortalProductId}");
                throw;
            }
        }
    }
}

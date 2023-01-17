
using Azure.Messaging.EventGrid;

using FluentValidation;

using Marketplace.Data.Repositories.ProductDomain;
using Marketplace.Domains.Models.ProductDomain;
using Marketplace.Infrastructure.Azure.Extensions.Configurations;
using Marketplace.Infrastructure.Azure.Extensions.EventGrid;
using Marketplace.Infrastructure.Shared.Enums;
using Marketplace.Infrastructure.Shared.Events;

using MediatR;

using Microsoft.Extensions.Options;

namespace Marketplace.Business.CQRS.ProductDomain.Commands
{
    public class UpsertProduct : IRequest
    {
        public UpsertProduct(int portalProductId, int tenantId, string name, string sKU, string barcode, string brand, string category, decimal price, decimal salesPrice, int taxRatio, ProductState state, int stockAmount, Gender gender, string size, IEnumerable<string>? colors = null)
        {
            PortalProductId = portalProductId;
            TenantId = tenantId;
            Name = name;
            SKU = sKU;
            Barcode = barcode;
            Brand = brand;
            Category = category;
            Price = price;
            SalesPrice = salesPrice;
            TaxRatio = taxRatio;
            State = state;
            StockAmount = stockAmount;
            Gender = gender;
            Size = size;
            Colors = colors;
        }

        public int PortalProductId { get; private set; }

        public int TenantId { get; private set; }

        public string Name { get; private set; }

        public string SKU { get; private set; }

        public string Barcode { get; private set; }

        public string Brand { get; private set; }

        public string Category { get; private set; }

        public decimal Price { get; private set; }

        public decimal SalesPrice { get; private set; }

        public Gender Gender { get; private set; }

        public string Size { get; private set; }

        public int TaxRatio { get; private set; }

        public ProductState State { get; private set; }

        public int StockAmount { get; private set; }

        public IEnumerable<string>? Colors { get; private set; }
    }

    internal class UpsertProductValidator : AbstractValidator<UpsertProduct>
    {
        public UpsertProductValidator()
        {
            RuleFor(x => x.SKU).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Barcode).NotEmpty();
            RuleFor(x => x.Brand).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Price).NotEmpty();
            RuleFor(x => x.SalesPrice).NotEmpty();
            RuleFor(x => x.TaxRatio).NotEmpty();
            RuleFor(x => x.State).IsInEnum().NotEqual(ProductState.None);
            RuleFor(x => x.StockAmount).NotEmpty().GreaterThan(0);
            RuleFor(x => x.Gender).IsInEnum();
            RuleFor(x => x.Size).NotEmpty();
        }
    }

    internal class UpsertProductHandler : IRequestHandler<UpsertProduct, Unit>
    {
        private readonly IProductRepository _productRepository;
        private readonly EventGridPublisherClient _eventGridPublisherClient;

        public UpsertProductHandler(
            IProductRepository productRepository,
            IEventGridPublisherClientFactory eventGridPublisherClientFactory,
            IOptions<EventGridClientOptions> eventGridOptions)
        {
            _productRepository = productRepository;
            _eventGridPublisherClient = eventGridPublisherClientFactory.GetClient(eventGridOptions.Value);
        }

        public async Task<Unit> Handle(UpsertProduct request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetByPortalIdAsync(request.TenantId, request.PortalProductId, cancellationToken);

            if (product != null)
            {
                product.Update(request.Name, request.SKU, request.Barcode, request.Brand, request.Category, request.Price, request.SalesPrice, request.TaxRatio, request.State);

                await _productRepository.UpdateAsync(product, cancellationToken);
            }
            else
            {
                product = new Product(request.Name, request.SKU, request.Barcode, request.Brand, request.Category, request.Price, request.SalesPrice, request.TaxRatio, request.State, request.TenantId, request.PortalProductId, request.Gender, request.Size);

                if (request.Colors != null)
                {
                    foreach (var color in request.Colors)
                    {
                        product.AddColor(color);
                    }
                }

                await _productRepository.AddAsync(product, cancellationToken);
            }

            var productDataChanged = new ProductDataChanged(EventPublishers.WebAPI, PublisherType.System, product.Id);

            var rawProductDataUploadedEvent = new EventGridEvent(
                nameof(ProductDataChanged),
                nameof(ProductDataChanged),
                productDataChanged.Version,
                productDataChanged);

            await _eventGridPublisherClient.SendEventAsync(rawProductDataUploadedEvent, cancellationToken);

            return Unit.Value;
        }
    }
}

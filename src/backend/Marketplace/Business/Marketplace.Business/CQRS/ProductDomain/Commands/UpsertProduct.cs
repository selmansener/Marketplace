
using FluentValidation;

using Marketplace.Data.Repositories.ProductDomain;
using Marketplace.Domains.Models.ProductDomain;
using Marketplace.Infrastructure.Shared.Enums;

using MediatR;

namespace Marketplace.Business.CQRS.ProductDomain.Commands
{
    public class UpsertProduct : IRequest
    {
        public UpsertProduct(int portalProductId, int tenantId, string name, string sKU, string barcode, string brand, string category, decimal price, decimal salesPrice, int taxRatio, ProductState state, int stockAmount)
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

        public int TaxRatio { get; private set; }

        public ProductState State { get; private set; }

        public int StockAmount { get; private set; }
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
        }
    }

    internal class UpsertProductHandler : IRequestHandler<UpsertProduct, Unit>
    {
        private readonly IProductRepository _productRepository;

        public UpsertProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Unit> Handle(UpsertProduct request, CancellationToken cancellationToken)
        {
            var existingProduct = await _productRepository.GetByPortalIdAsync(request.TenantId, request.PortalProductId, cancellationToken);

            if (existingProduct != null)
            {
                existingProduct.Update(request.Name, request.SKU, request.Barcode, request.Brand, request.Category, request.Price, request.SalesPrice, request.TaxRatio, request.State);

                await _productRepository.UpdateAsync(existingProduct, cancellationToken);
            }
            else
            {
                var product = new Product(request.Name, request.SKU, request.Barcode, request.Brand, request.Category, request.Price, request.SalesPrice, request.TaxRatio, request.State, request.TenantId, request.PortalProductId);

                await _productRepository.AddAsync(product, cancellationToken);
            }

            return Unit.Value;
        }
    }
}

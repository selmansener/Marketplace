
using Mapster;

using Marketplace.Domains.Models.ProductDomain;

namespace Marketplace.Business.CQRS.ProductDomain.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string SKU { get; set; }

        public string Barcode { get; set; }

        public string Brand { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public decimal SalesPrice { get; set; }

        public int TaxRatio { get; set; }

        public string State { get; set; }

        public int TenantId { get; set; }

        public int PortalProductId { get; set; }

        public int StockAmount { get; set; }

        public string Gender { get; set; }

        public string Size { get; set; }

        public IEnumerable<string> Colors { get; set; }
    }

    internal class ProductDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Product, ProductDTO>()
                .Map(dest => dest.StockAmount, src => src.Inventory.Amount);
        }
    }
}

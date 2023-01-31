
using Mapster;

using Marketplace.Domains.Models.ProductDomain;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Business.CQRS.ProductDomain.DTOs
{
    public class ProductDetailsDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string SKU { get; set; }

        public string Brand { get; set; }

        public string Category { get; set; }

        public decimal SalesPrice { get; set; }

        public Gender Gender { get; set; }

        public int Amount { get; set; }

        public IEnumerable<string> Images { get; set; }
    }

    internal class ProductDetailsDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Product, ProductDetailsDTO>()
                .Map(dest => dest.Amount, src => src.Inventory.Amount)
                .Map(dest => dest.Images, src => src.Images.Select(image => image.Url));
        }
    }
}

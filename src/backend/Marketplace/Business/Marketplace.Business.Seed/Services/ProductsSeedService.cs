
using System.Collections.Immutable;

using Marketplace.Business.Seed.Configuration;
using Marketplace.Data.DataAccess;
using Marketplace.Domains.Models.InventoryDomain;
using Marketplace.Domains.Models.ProductDomain;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Business.Seed.Services
{
    internal class ProductsSeedService : BaseSeedService
    {
        public ProductsSeedService(MarketplaceDbContext dbContext)
            : base(dbContext)
        {
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var productCategories = _faker.Commerce.Categories(10);

            var brands = new List<string>
            {
                "Mavi",
                "Zara",
                "LCW",
                "Boyner",
                "Lacoste",
                "CHANEL",
                "Prada",
                "Hermes"
            };

            var colors = new List<string>
            {
                "Black",
                "Silver",
                "Gray",
                "White",
                "Maroon",
                "Red",
                "Purple",
                "Fuchsia",
                "Green",
                "Lime",
                "Olive",
                "Yellow",
                "Navy",
                "Blue",
                "Teal",
                "Aqua",
            };

            var sizes = new List<string>
            {
                "3XS",
                "XXS",
                "XS",
                "M",
                "L",
                "XXL",
                "3XL",
                "35",
                "35.5",
                "36",
                "37",
                "38",
                "39",
                "40",
                "41",
                "42",
                "43",
                "44",
                "45",
                "46",
            };

            var products = new List<Product>();
            for (int i = 0; i < 50; i++)
            {
                var product = new Product(_faker.Commerce.ProductName(), _faker.Random.Replace("##-###-###"), _faker.Random.Replace("##-######"), _faker.PickRandom(brands), _faker.PickRandom(productCategories), decimal.Parse(_faker.Commerce.Price()), decimal.Parse(_faker.Commerce.Price()), 8, ProductState.Available, 1, i + 1, _faker.PickRandom<Gender>(), _faker.PickRandom(sizes));

                var colorCount = _faker.Random.Int(1, 4);
                for (int j = 0; j < colorCount; j++)
                {
                    product.AddColor(_faker.PickRandom(colors));
                }

                for (int k = 0; k < 5; k++)
                {
                    product.AddProductImage("image", "image/png", $"https://picsum.photos/id/{_faker.Random.Int(1, 500)}/300/200", "png");
                }

                products.Add(product);
            }

            await _dbContext.AddRangeAsync(products);

            var availableProducts = products.Where(x => x.State == ProductState.Available).ToList();
            var inventoryItems = new List<InventoryItem>();
            foreach (var product in availableProducts)
            {
                var inventoryItem = new InventoryItem(product.Id, _faker.Random.Int(min: 100, max: 500));
                inventoryItems.Add(inventoryItem);
            }

            await _dbContext.AddRangeAsync(inventoryItems);
        }
    }
}

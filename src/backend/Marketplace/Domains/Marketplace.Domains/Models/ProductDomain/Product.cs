
using Marketplace.Domains.Base;
using Marketplace.Domains.Models.InventoryDomain;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Domains.Models.ProductDomain
{
    public class Product : BaseEntity
    {
        private readonly List<string> _colors = new List<string>();
        private readonly List<ProductImage> _images = new List<ProductImage>();

        public Product(string name, string sKU, string barcode, string brand, string category, decimal price, decimal salesPrice, int taxRatio, ProductState state, int tenantId, int portalProductId, Gender gender, string size)
        {
            Name = name;
            SKU = sKU;
            Barcode = barcode;
            Brand = brand;
            Category = category;
            Price = price;
            SalesPrice = salesPrice;
            TaxRatio = taxRatio;
            State = state;
            TenantId = tenantId;
            PortalProductId = portalProductId;
            Gender = gender;
            Size = size;
        }

        public string Name { get; private set; }

        public string SKU { get; private set; }

        public string Barcode { get; private set; }

        public string Brand { get; private set; }

        public string Category { get; private set; }

        public decimal Price { get; private set; }

        public decimal SalesPrice { get; private set; }

        public int TaxRatio { get; private set; }

        public ProductState State { get; private set; }

        public int TenantId { get; private set; }

        public int PortalProductId { get; private set; }

        public InventoryItem? Inventory { get; private set; }

        public Gender Gender { get; private set; }

        public string Size { get; private set; }

        public IReadOnlyList<string> Colors => _colors;

        public IReadOnlyList<ProductImage> Images => _images;

        public void Update(string name, string sKU, string barcode, string brand, string category, decimal price, decimal salesPrice, int taxRatio, ProductState state)
        {
            Name = name;
            SKU = sKU;
            Barcode = barcode;
            Brand = brand;
            Category = category;
            Price = price;
            SalesPrice = salesPrice;
            TaxRatio = taxRatio;
            State = state;
        }

        public void AddColor(string color)
        {
            if (string.IsNullOrEmpty(color))
            {
                throw new ArgumentNullException(nameof(color));
            }

            _colors.Add(color);
        }

        public void AddProductImage(string name, string contentType, string url, string extension)
        {
            _images.Add(new ProductImage(Id, name, contentType, url, extension));
        }
    }
}


using System.Collections.Generic;

using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Functions.EventHandlers.Events
{
    internal class ProductVerified : BaseEvent
    {
        public int PortalProductId { get; set; }

        public int TenantId { get; set; }

        public string Name { get; set; }

        public string SKU { get; set; }

        public string Barcode { get; set; }

        public string Brand { get; set; }

        public string Category { get; set; }

        public decimal Price { get; set; }

        public decimal SalesPrice { get; set; }

        public int TaxRatio { get; set; }

        public ProductState State { get; set; }

        public int StockAmount { get; set; }

        public Gender Gender { get; set; }

        public string Size { get; set; }

        public IEnumerable<string>? Colors { get; set; }
    }
}

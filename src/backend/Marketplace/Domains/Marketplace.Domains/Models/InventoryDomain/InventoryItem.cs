
using Marketplace.Domains.Base;
using Marketplace.Domains.Models.ProductDomain;

namespace Marketplace.Domains.Models.InventoryDomain
{
    public class InventoryItem : BaseEntity
    {
        public InventoryItem(int productId, int amount)
        {
            ProductId = productId;
            Amount = amount;
        }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public int Amount { get; private set; }
    }
}

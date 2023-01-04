using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Domains.Models.ProductDomain;

namespace Marketplace.Domains.Models.InventoryDomain
{
    public class InventoryItem : BaseEntity
    {
        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public int Amount { get; private set; }
    }
}

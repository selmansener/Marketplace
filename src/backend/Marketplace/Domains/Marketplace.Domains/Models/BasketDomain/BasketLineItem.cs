using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Domains.Models.ProductDomain;

namespace Marketplace.Domains.Models.BasketDomain
{
    public class BasketLineItem : BaseEntity
    {
        public int BasketId { get; private set; }

        public Basket Basket { get; private set; }

        public int ProductId { get; private set; }

        public Product Product { get; private set; }

        public int Amount { get; private set; }
    }
}

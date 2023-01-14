using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Domains.Models.AccountDomain;
using Marketplace.Domains.Models.AddressDomain;

namespace Marketplace.Domains.Models.BasketDomain
{
    public class Basket : BaseEntity
    {
        private readonly List<BasketLineItem> _lineItems = new List<BasketLineItem>();

        public Guid? AccountId { get; private set; }

        public Account? Account { get; private set; }

        public BasketDeliveryAddress? BasketDeliveryAddress { get; private set; }

        public BaseketBillingAddress? BaseketBillingAddress { get; private set; }

        public IReadOnlyList<BasketLineItem> LineItems => _lineItems;
    }
}

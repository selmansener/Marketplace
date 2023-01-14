
using Marketplace.Domains.Base;
using Marketplace.Domains.Exceptions;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Domains.Models.SalesOrderDomain
{
    public class SalesOrder : BaseEntity
    {
        private readonly List<SalesOrderLineItem> _lineItems = new List<SalesOrderLineItem>();
        private readonly List<Shipment> _shipments = new List<Shipment>();

        public SalesOrder()
        {
            State = SalesOrderState.Created;
        }

        public SalesOrderState State { get; private set; }

        public SalesOrderDeliveryAddress? DeliveryAddress { get; private set; }

        public SalesOrderBillingAddress? BillingAddress { get; private set; }

        public Shipment? Shipment { get; private set; }

        public string? InvoiceUrl { get; private set; }

        public DateTime MarketplaceOrderCreatedAt { get; private set; }

        public IReadOnlyList<SalesOrderLineItem> LineItems => _lineItems;

        public IReadOnlyList<Shipment> Shipments => _shipments;

        public void AddLineItem(int productId, int amount, decimal price, decimal salesPrice)
        {
            var doesSameProductExists = _lineItems.Any(x => x.ProductId == productId);

            if (doesSameProductExists)
            {
                throw new DuplicateSalesOrderLineItemException(Id, productId);
            }

            _lineItems.Add(new SalesOrderLineItem(Id, productId, amount, price, salesPrice));
        }

        public void AssignDeliveryAddress(SalesOrderDeliveryAddress deliveryAddress)
        {
            if (DeliveryAddress != null)
            {
                // TODO: throw exception
            }

            DeliveryAddress = deliveryAddress;
        }

        public void AssignBillingAddress(SalesOrderBillingAddress billingAddress)
        {
            if (BillingAddress != null)
            {
                // TODO: throw exception
            }

            BillingAddress = billingAddress;
        }
    }
}

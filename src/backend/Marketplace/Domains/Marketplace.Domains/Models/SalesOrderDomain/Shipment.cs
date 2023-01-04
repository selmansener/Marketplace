
using Marketplace.Domains.Base;

namespace Marketplace.Domains.Models.SalesOrderDomain
{
    public class Shipment : BaseEntity
    {
        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }
    }
}

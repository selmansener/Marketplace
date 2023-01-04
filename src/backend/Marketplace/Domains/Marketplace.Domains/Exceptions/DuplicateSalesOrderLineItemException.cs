namespace Marketplace.Domains.Exceptions
{
    internal class DuplicateSalesOrderLineItemException : Exception
    {
        public DuplicateSalesOrderLineItemException(int salesOrderId, int productId)
            : base($"SalesOrder (Id: {salesOrderId}) already has a LineItem with ProductId: {productId}.")
        {
            SalesOrderId = salesOrderId;
            ProductId = productId;
        }

        public int SalesOrderId { get; private set; }

        public int ProductId { get; private set; }
    }
}

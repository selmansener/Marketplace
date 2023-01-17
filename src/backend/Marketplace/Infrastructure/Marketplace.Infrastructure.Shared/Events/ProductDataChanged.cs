namespace Marketplace.Infrastructure.Shared.Events
{
    public class ProductDataChanged : BaseEvent
    {
        public ProductDataChanged(string publisherId, PublisherType publisherType, int productId)
            : base(publisherId, publisherType)
        {
            ProductId = productId;
        }

        public int ProductId { get; set; }

        public override string Version => "1.0";
    }
}

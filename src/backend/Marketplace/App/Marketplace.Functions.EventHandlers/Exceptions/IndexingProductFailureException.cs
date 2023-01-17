using System;

namespace Marketplace.Functions.EventHandlers.Exceptions
{
    internal class IndexingProductFailureException : Exception
    {
        public IndexingProductFailureException(int productId, string additionalInformation)
            : base($"Indexing product with Id: {productId} failed. AdditionalInfo: {additionalInformation}")
        {
            ProductId = productId;
            AdditionalInformation = additionalInformation;
        }

        public int ProductId { get; private set; }

        public string AdditionalInformation { get; private set; }
    }
}

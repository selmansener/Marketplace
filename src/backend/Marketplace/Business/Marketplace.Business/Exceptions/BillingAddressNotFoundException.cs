using Marketplace.Infrastructure.Shared.Interfaces;

namespace Marketplace.Business.Exceptions
{
    internal class BillingAddressNotFoundException : Exception, IClientException
    {
        public BillingAddressNotFoundException(Guid accountId, int billingAddressId)
            : base($"BillingAddress not found with Id: {billingAddressId} and AccountId: {accountId}")
        {
            AccountId = accountId;
            BillingAddressId = billingAddressId;
        }

        public Guid AccountId { get; private set; }

        public int BillingAddressId { get; private set; }

        public int StatusCode => 404;
    }
}

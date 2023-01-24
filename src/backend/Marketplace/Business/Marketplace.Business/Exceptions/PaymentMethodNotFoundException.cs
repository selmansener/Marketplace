using Marketplace.Infrastructure.Shared.Interfaces;

namespace Marketplace.Business.Exceptions
{
    internal class PaymentMethodNotFoundException : Exception, IClientException
    {
        public PaymentMethodNotFoundException(Guid accountId, int paymentMethodId)
            : base($"PaymentMethod not found with Id: {paymentMethodId} and AccountId: {accountId}")
        {
            AccountId = accountId;
            PaymentMethodId = paymentMethodId;
        }

        public Guid AccountId { get; private set; }

        public int PaymentMethodId { get; private set; }

        public int StatusCode => 404;
    }
}

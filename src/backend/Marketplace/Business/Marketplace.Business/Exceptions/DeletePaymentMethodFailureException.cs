namespace Marketplace.Business.Exceptions
{
    internal class DeletePaymentMethodFailureException : Exception
    {
        public DeletePaymentMethodFailureException(string message)
            : base(message)
        {

        }
    }
}

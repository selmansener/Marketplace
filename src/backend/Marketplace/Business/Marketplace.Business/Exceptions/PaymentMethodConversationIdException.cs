using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Business.Exceptions
{
    internal class PaymentMethodConversationIdException : Exception
    {
        public PaymentMethodConversationIdException(string expectedId, string currentId)
            : base($"ConversationId doesn't match for Iyzico request. ExpectedId: {expectedId}, CurrentId: {currentId}")
        {
            ExpectedId = expectedId;
            CurrentId = currentId;
        }

        public string ExpectedId { get; private set; }

        public string CurrentId { get; private set; }
    }
}

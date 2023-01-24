using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Business.Exceptions
{
    internal class CreatePaymentMethodFailureException : Exception
    {
        public CreatePaymentMethodFailureException(string message)
            : base(message)
        {

        }
    }
}

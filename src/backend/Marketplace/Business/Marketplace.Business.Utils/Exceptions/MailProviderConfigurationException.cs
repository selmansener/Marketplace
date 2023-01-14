using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Business.Utils.Exceptions
{
    internal class MailProviderConfigurationException : Exception
    {
        public MailProviderConfigurationException(string message)
            : base(message)
        {

        }
    }
}

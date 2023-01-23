using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Business.CQRS.AddressDomain.DTOs
{
    public class AddressDTO
    {
        public string City { get; private set; }

        public string District { get; private set; }

        public string Country { get; private set; }

        public string ZipCode { get; private set; }

        public string FullAddress { get; private set; }
    }
}

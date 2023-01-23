using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Infrastructure.Shared.Interfaces;

namespace Marketplace.Business.Exceptions
{
    internal class DeliveryAddressNotFoundException : Exception, IClientException
    {
        public DeliveryAddressNotFoundException(Guid accountId, int deliveryAddressId)
            : base($"DeliveryAddress not found with Id: {deliveryAddressId} and AccountId: {accountId}")
        {
            AccountId = accountId;
            DeliveryAddressId = deliveryAddressId;
        }

        public Guid AccountId { get; private set; }

        public int DeliveryAddressId { get; private set; }

        public int StatusCode => 404;
    }
}

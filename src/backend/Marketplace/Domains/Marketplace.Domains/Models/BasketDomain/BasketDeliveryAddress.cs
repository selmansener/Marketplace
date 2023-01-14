using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Infrastructure.Shared.Models;

namespace Marketplace.Domains.Models.BasketDomain
{
    public class BasketDeliveryAddress : BaseEntity
    {
        protected BasketDeliveryAddress() { }

        public BasketDeliveryAddress(int basketId, string fullName, string phone, string? email, string city, string district, string zipCode, string fullAddress)
        {
            BasketId = basketId;
            FullName = fullName;
            Phone = phone;
            Email = email;
            Details = new Address(city, district, "Turkey", zipCode, fullAddress);
        }

        public int BasketId { get; private set; }

        public Basket Basket { get; private set; }

        public string FullName { get; private set; }

        public string Phone { get; private set; }

        public string? Email { get; private set; }

        public Address Details { get; private set; }
    }
}

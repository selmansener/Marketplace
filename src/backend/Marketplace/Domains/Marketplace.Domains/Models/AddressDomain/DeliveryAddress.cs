using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Domains.Models.AccountDomain;
using Marketplace.Domains.Models.SalesOrderDomain;
using Marketplace.Infrastructure.Shared.Models;

namespace Marketplace.Domains.Models.AddressDomain
{
    public class DeliveryAddress : BaseEntity
    {
        protected DeliveryAddress() { }

        public DeliveryAddress(Guid accountId, string name, string fullName, string phone, string? email, string city, string district, string zipCode, string fullAddress)
        {
            Name = name;
            AccountId = accountId;
            FullName = fullName;
            Phone = phone;
            Email = email;
            Details = new Address(city, district, "Turkey", zipCode, fullAddress);
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string Name { get; private set; }

        public string FullName { get; private set; }

        public string Phone { get; private set; }

        public string? Email { get; private set; }

        public Address Details { get; private set; }

        public void Update(string name, string fullName, string phone, string? email, string city, string district, string zipCode, string fullAddress)
        {
            Name = name;
            FullName = fullName;
            Phone = phone;
            Email = email;
            Details = Details.Update(city, district, "Turkey", zipCode, fullAddress);
        }
    }
}

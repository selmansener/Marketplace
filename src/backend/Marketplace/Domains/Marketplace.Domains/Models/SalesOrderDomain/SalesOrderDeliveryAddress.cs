﻿
using Marketplace.Domains.Base;
using Marketplace.Infrastructure.Shared.Models;

namespace Marketplace.Domains.Models.SalesOrderDomain
{
    public class SalesOrderDeliveryAddress : BaseEntity
    {
        protected SalesOrderDeliveryAddress() { }

        public SalesOrderDeliveryAddress(int salesOrderId, string fullName, string phone, string? email, string city, string district, string zipCode, string fullAddress)
        {
            SalesOrderId = salesOrderId;
            FullName = fullName;
            Phone = phone;
            Email = email;
            Details = new Address(city, district, "Turkey", zipCode, fullAddress);
        }

        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }

        public string FullName { get; private set; }

        public string Phone { get; private set; }

        public string? Email { get; private set; }

        public Address Details { get; private set; }
    }
}

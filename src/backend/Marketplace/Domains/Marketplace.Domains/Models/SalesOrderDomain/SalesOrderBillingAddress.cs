﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Infrastructure.Shared.Enums;
using Marketplace.Infrastructure.Shared.Models;

namespace Marketplace.Domains.Models.SalesOrderDomain
{
    public class SalesOrderBillingAddress : BaseEntity
    {
        protected SalesOrderBillingAddress() { }

        public SalesOrderBillingAddress(int salesOrderId, BillingType type, string fullName, string phone, string email, string? tCKN, string? taxNumber, string? taxOffice, string city, string district, string zipCode, string fullAddress)
        {
            SalesOrderId = salesOrderId;
            Type = type;
            FullName = fullName;
            Phone = phone;
            Email = email;
            TCKN = tCKN;
            TaxNumber = taxNumber;
            TaxOffice = taxOffice;
            Details = new Address(city, district, "Turkey", zipCode, fullAddress);
        }

        public int SalesOrderId { get; private set; }

        public SalesOrder SalesOrder { get; private set; }

        public BillingType Type { get; private set; }

        public string FullName { get; private set; }

        public string Phone { get; private set; }

        public string Email { get; private set; }

        public string? TCKN { get; private set; }

        public string? TaxNumber { get; private set; }

        public string? TaxOffice { get; private set; }

        public Address Details { get; private set; }
    }
}

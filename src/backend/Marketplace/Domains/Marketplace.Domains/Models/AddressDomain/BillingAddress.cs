using Marketplace.Domains.Base;
using Marketplace.Domains.Models.AccountDomain;
using Marketplace.Infrastructure.Shared.Enums;
using Marketplace.Infrastructure.Shared.Models;

namespace Marketplace.Domains.Models.AddressDomain
{
    public class BillingAddress : BaseEntity
    {
        protected BillingAddress() { }

        public BillingAddress(Guid accountId, string name, BillingType type, string fullName, string phone, string email, string? tCKN, string? taxNumber, string? taxOffice, string city, string district, string zipCode, string fullAddress)
        {
            Name = name;
            AccountId = accountId;
            Type = type;
            FullName = fullName;
            Phone = phone;
            Email = email;
            TCKN = tCKN;
            TaxNumber = taxNumber;
            TaxOffice = taxOffice;
            Details = new Address(city, district, "Turkey", zipCode, fullAddress);
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string Name { get; private set; }

        public BillingType Type { get; private set; }

        public string FullName { get; private set; }

        public string Phone { get; private set; }

        public string Email { get; private set; }

        public string? TCKN { get; private set; }

        public string? TaxNumber { get; private set; }

        public string? TaxOffice { get; private set; }

        public Address Details { get; private set; }

        public void Update(BillingType type, string name, string fullName, string phone, string email, string? tCKN, string? taxNumber, string? taxOffice, string city, string district, string zipCode, string fullAddress)
        {
            Type = type;
            Name = name;
            FullName = fullName;
            Phone = phone;
            Email = email;
            TCKN = tCKN;
            TaxNumber = taxNumber;
            TaxOffice = taxOffice;
            Details = Details.Update(city, district, "Turkey", zipCode, fullAddress);
        }
    }
}

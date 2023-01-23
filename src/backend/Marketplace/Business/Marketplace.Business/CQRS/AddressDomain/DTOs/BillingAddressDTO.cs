using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Business.CQRS.AddressDomain.DTOs
{
    public class BillingAddressDTO
    {
        public int Id { get; set; }

        public BillingType Type { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string? TCKN { get; set; }

        public string? TaxNumber { get; set; }

        public string? TaxOffice { get; set; }

        public AddressDTO Details { get; set; }
    }
}

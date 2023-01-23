namespace Marketplace.Business.CQRS.AddressDomain.DTOs
{
    public class DeliveryAddressDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string? Email { get; set; }

        public AddressDTO Details { get; set; }
    }
}

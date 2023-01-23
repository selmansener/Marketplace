namespace Marketplace.Infrastructure.Shared.Models
{
    public class Address : ValueObject<Address>
    {
        public Address(string city, string district, string country, string zipCode, string fullAddress)
        {
            City = city;
            District = district;
            Country = country;
            ZipCode = zipCode;
            FullAddress = fullAddress;
        }

        public string City { get; private set; }

        public string District { get; private set; }

        public string Country { get; private set; }

        public string ZipCode { get; private set; }

        public string FullAddress { get; private set; }

        public Address Update(string city, string district, string country, string zipCode, string fullAddress)
        {
            return new Address(city, district, country, zipCode, fullAddress);
        }
    }
}

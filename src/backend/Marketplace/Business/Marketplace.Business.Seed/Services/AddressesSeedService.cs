using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Bogus;

using Marketplace.Business.Seed.Configuration;
using Marketplace.Business.Utils.AddressDomain;
using Marketplace.Data.DataAccess;
using Marketplace.Domains.Models.AddressDomain;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Business.Seed.Services
{
    internal class AddressesSeedService : BaseSeedService
    {
        private readonly IAddressService _addressService;

        public AddressesSeedService(MarketplaceDbContext dbContext, IAddressService addressService) 
            : base(dbContext)
        {
            _addressService = addressService;
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var accounts = await _dbContext.Accounts.ToListAsync(cancellationToken);

            var addressNames = new List<string>
            {
                "Ev",
                "İş",
                "Ofis",
                "Annemler",
                "Çarşamba Pazarı",
                "Eski Mahalle",
                "Yeni Ev",
                "Ara Sokak"
            };

            var cities = _addressService.GetCities();

            var faker = new Faker("tr");

            var billingAddresses = new List<BillingAddress>();
            var deliveryAddreses = new List<DeliveryAddress>();
            foreach (var account in accounts)
            {
                var fullName = $"{account.FirstName} {account.LastName}";
                for (int i = 0; i < 5; i++)
                {
                    var randomCity = faker.PickRandom(cities);
                    var districts = _addressService.GetDistricts(randomCity.Code);
                    var randomDistrict = faker.PickRandom(districts);

                    var billingAddress = new BillingAddress(account.Id, faker.PickRandom(addressNames), Infrastructure.Shared.Enums.BillingType.Individual, fullName, account.Phone, account.Email, faker.Random.Replace("###########"), null, null, randomCity.Name, randomDistrict.Name, faker.Address.ZipCode(), faker.Address.FullAddress());
                    billingAddresses.Add(billingAddress);
                }

                for (int i = 0; i < 5; i++)
                {
                    var randomCity = faker.PickRandom(cities);
                    var districts = _addressService.GetDistricts(randomCity.Code);
                    var randomDistrict = faker.PickRandom(districts);

                    var deliveryAddress = new DeliveryAddress(account.Id, faker.PickRandom(addressNames), fullName, account.Phone, account.Email, randomCity.Name, randomDistrict.Name, faker.Address.ZipCode(), faker.Address.FullAddress());
                    deliveryAddreses.Add(deliveryAddress);
                }
            }

            await _dbContext.BillingAddresses.AddRangeAsync(billingAddresses);
            await _dbContext.DeliveryAddresses.AddRangeAsync(deliveryAddreses);
        }
    }
}

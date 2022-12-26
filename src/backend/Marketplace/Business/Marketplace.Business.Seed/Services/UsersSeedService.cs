
using Bogus;

using Iyzipay.Model;
using Iyzipay.Request;

using Microsoft.Extensions.Options;

using Marketplace.Business.Seed.Data;
using Marketplace.Data.DataAccess;
using Marketplace.Infrastructure.Shared.Configurations;
using Marketplace.Domains.Models.AccountDomain;

namespace Marketplace.Business.Seed.Services
{
    internal class UsersSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public UsersSeedService(MarketplaceDbContext dbContext, SeedData seedData, IOptions<IyzicoAPIOptions> options)
            : base(dbContext)
        {
            _seedData = seedData;
            _iyzicoAPIOptions = options.Value;
        }

        public override async Task Execute(CancellationToken cancellationToken)
        {

            foreach (var user in _seedData.Users)
            {
                var account = new Account(
                    user.Id,
                    user.Email,
                    user.FirstName,
                    user.LastName,
                    user.BirthDate,
                    user.Gender,
                    user.Phone);

                account.Activate();
                account.Verify();

                await _dbContext.AddAsync(account, cancellationToken);
            }
        }
    }
}

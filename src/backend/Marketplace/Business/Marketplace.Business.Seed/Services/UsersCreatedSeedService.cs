
using Marketplace.Business.Seed.Data;
using Marketplace.Data.DataAccess;
using Marketplace.Domains.Models.AccountDomain;

namespace Marketplace.Business.Seed.Services
{
    internal class UsersCreatedSeedService : BaseSeedService
    {
        private readonly SeedData _seedData;

        public UsersCreatedSeedService(MarketplaceDbContext dbContext, SeedData seedData)
            : base(dbContext)
        {
            _seedData = seedData;

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

                account.Verify();

                await _dbContext.AddAsync(account, cancellationToken);
            }
        }
    }
}

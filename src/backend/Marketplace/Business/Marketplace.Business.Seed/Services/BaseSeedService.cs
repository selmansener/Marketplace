using System.Collections.Immutable;

using Marketplace.Business.Seed.Configuration;
using Marketplace.Data.DataAccess;

namespace Marketplace.Business.Seed.Services
{
    internal interface ISeedService
    {
        Task Execute(CancellationToken cancellationToken);

        ImmutableList<SeedServiceType> GetDependencies();
    }

    internal abstract class BaseSeedService : ISeedService
    {
        protected readonly MarketplaceDbContext _dbContext;

        protected BaseSeedService(MarketplaceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected virtual ImmutableList<SeedServiceType> Dependencies { get; } = ImmutableList<SeedServiceType>.Empty;

        public abstract Task Execute(CancellationToken cancellationToken);

        public ImmutableList<SeedServiceType> GetDependencies()
        {
            return Dependencies;
        }
    }
}

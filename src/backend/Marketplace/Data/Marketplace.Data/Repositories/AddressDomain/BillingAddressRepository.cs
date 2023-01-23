using Marketplace.Data.DataAccess;
using Marketplace.Data.Repositories.Base;
using Marketplace.Domains.Models.AddressDomain;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Data.Repositories.AddressDomain
{
    public interface IBillingAddressRepository : IBaseRepository<BillingAddress>
    {
        Task<BillingAddress?> GetByIdAsync(Guid accountId, int billingAddressId, CancellationToken cancellationToken);
    }

    internal class BillingAddressRepository : BaseRepository<BillingAddress>, IBillingAddressRepository
    {
        public BillingAddressRepository(MarketplaceDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<BillingAddress?> GetByIdAsync(Guid accountId, int billingAddressId, CancellationToken cancellationToken)
        {
            return await _baseDb.BillingAddresses.FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == billingAddressId, cancellationToken);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Data.DataAccess;
using Marketplace.Data.Repositories.Base;
using Marketplace.Domains.Models.AddressDomain;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Data.Repositories.AddressDomain
{
    public interface IDeliveryAddressRepository : IBaseRepository<DeliveryAddress> 
    {
        Task<DeliveryAddress?> GetByIdAsync(Guid accountId, int deliveryAddressId, CancellationToken cancellationToken);
    }

    internal class DeliveryAddressRepository : BaseRepository<DeliveryAddress>, IDeliveryAddressRepository
    {
        public DeliveryAddressRepository(MarketplaceDbContext baseDb) 
            : base(baseDb)
        {
        }

        public async Task<DeliveryAddress?> GetByIdAsync(Guid accountId, int deliveryAddressId, CancellationToken cancellationToken)
        {
            return await _baseDb.DeliveryAddresses.FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == deliveryAddressId, cancellationToken);
        }
    }
}

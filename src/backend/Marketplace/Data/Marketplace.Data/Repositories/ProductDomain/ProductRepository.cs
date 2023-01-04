
using Marketplace.Data.DataAccess;
using Marketplace.Data.Repositories.Base;
using Marketplace.Domains.Models.ProductDomain;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Data.Repositories.ProductDomain
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<Product?> GetByPortalIdAsync(int tenantId, int portalProductId, CancellationToken cancellationToken);
    }

    internal class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(MarketplaceDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<Product?> GetByPortalIdAsync(int tenantId, int portalProductId, CancellationToken cancellationToken)
        {
            return await _baseDb.Products.FirstOrDefaultAsync(x => x.PortalProductId == portalProductId && x.TenantId == tenantId, cancellationToken);
        }
    }
}

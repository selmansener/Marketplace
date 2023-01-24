using Marketplace.Data.DataAccess;
using Marketplace.Data.Repositories.Base;
using Marketplace.Domains.Models.FinanceDomain;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Data.Repositories.FinanceDomain
{
    public interface IPaymentMethodRepository : IBaseRepository<PaymentMethod> 
    {
        Task<PaymentMethod?> GetByIdAsync(Guid accountId, int paymentMethodId, CancellationToken cancellationToken);
    }

    internal class PaymentMethodRepository : BaseRepository<PaymentMethod>, IPaymentMethodRepository
    {
        public PaymentMethodRepository(MarketplaceDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<PaymentMethod?> GetByIdAsync(Guid accountId, int paymentMethodId, CancellationToken cancellationToken)
        {
            return await _baseDb.PaymentMethods.FirstOrDefaultAsync(x => x.AccountId == accountId && x.Id == paymentMethodId, cancellationToken);
        }
    }
}

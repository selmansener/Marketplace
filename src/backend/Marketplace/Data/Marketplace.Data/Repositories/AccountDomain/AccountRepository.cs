
using Microsoft.EntityFrameworkCore;

using Marketplace.Data.DataAccess;
using Marketplace.Data.Repositories.Base;
using Marketplace.Domains.Models.AccountDomain;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Data.Repositories.AccountDomain
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken);

        Task<Account?> GetByMail(string mail, CancellationToken cancellationToken);

        Task<IEnumerable<Account>> GetAllActiveAsync(CancellationToken cancellationToken);
    }

    internal class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        public AccountRepository(MarketplaceDbContext baseDb)
            : base(baseDb)
        {
        }

        public async Task<IEnumerable<Account>> GetAllActiveAsync(CancellationToken cancellationToken)
        {
            return await _baseDb.Accounts.Where(x => x.State == AccountState.Active).ToListAsync(cancellationToken);
        }

        public async Task<Account?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _baseDb.Accounts.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<Account?> GetByMail(string mail, CancellationToken cancellationToken)
        {
            return await GetAll().FirstOrDefaultAsync(account => account.Email == mail, cancellationToken);
        }
    }
}

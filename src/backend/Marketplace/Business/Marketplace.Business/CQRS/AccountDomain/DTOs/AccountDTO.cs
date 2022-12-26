
using Mapster;

using Marketplace.Domains.Models.AccountDomain;
using Marketplace.Infrastructure.Shared.Enums;

namespace Marketplace.Business.CQRS.AccountDomain.DTOs
{
    public class AccountDTO
    {
        public Guid Id { get; private set; }

        public string? FirstName { get; private set; }

        public string? LastName { get; private set; }

        public DateTime? BirthDate { get; private set; }

        public Gender Gender { get; private set; }

        public string? Email { get; private set; }

        public string? Phone { get; private set; }

        public AccountState State { get; private set; }

        public bool IsVerified { get; private set; }
    }

    public class AccountDTOMapper : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.ForType<Account, AccountDTO>();
        }
    }
}

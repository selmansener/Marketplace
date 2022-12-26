
using Mapster;

using MediatR;

using Marketplace.Business.CQRS.AccountDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AccountDomain;
using Marketplace.Domains.Models.AccountDomain;
using FluentValidation;

namespace Marketplace.Business.CQRS.AccountDomain.Queries
{
    public class GetAccount : IRequest<AccountDTO>
    {
        public Guid Id { get; set; }
    }

    internal class GetAccountValidator : AbstractValidator<GetAccount>
    {
        public GetAccountValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }

    internal class GetAccountHandler : IRequestHandler<GetAccount, AccountDTO>
    {
        private readonly IAccountRepository _accountRepository;

        public GetAccountHandler(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public async Task<AccountDTO> Handle(GetAccount request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByIdAsync(request.Id, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.Id);
            }

            return account.Adapt<AccountDTO>();
        }
    }
}

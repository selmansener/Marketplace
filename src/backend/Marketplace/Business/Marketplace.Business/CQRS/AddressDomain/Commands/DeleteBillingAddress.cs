using FluentValidation;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;

using MediatR;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class DeleteBillingAddress : IRequest
    {
        public DeleteBillingAddress(Guid accountId, int billingAddressId)
        {
            AccountId = accountId;
            BillingAddressId = billingAddressId;
        }

        public Guid AccountId { get; private set; }

        public int BillingAddressId { get; private set; }
    }

    internal class DeleteBillingAddressValidator : AbstractValidator<DeleteBillingAddress>
    {
        public DeleteBillingAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.BillingAddressId).NotEmpty();
        }
    }

    internal class DeleteBillingAddressHandler : IRequestHandler<DeleteBillingAddress>
    {
        private readonly IBillingAddressRepository _billingAddressRepository;

        public DeleteBillingAddressHandler(IBillingAddressRepository billingAddressRepository)
        {
            _billingAddressRepository = billingAddressRepository;
        }

        public async Task<Unit> Handle(DeleteBillingAddress request, CancellationToken cancellationToken)
        {
            var billingAddress = await _billingAddressRepository.GetByIdAsync(request.AccountId, request.BillingAddressId, cancellationToken);

            if (billingAddress == null)
            {
                throw new BillingAddressNotFoundException(request.AccountId, request.BillingAddressId);
            }

            await _billingAddressRepository.SoftDelete(billingAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.AddressDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;

using MediatR;

namespace Marketplace.Business.CQRS.AddressDomain.Queries
{
    public class GetBillingAddress : IRequest<BillingAddressDTO>
    {
        public GetBillingAddress(Guid accountId, int billingAddressId)
        {
            AccountId = accountId;
            BillingAddressId = billingAddressId;
        }

        public Guid AccountId { get; private set; }

        public int BillingAddressId { get; private set; }
    }

    internal class GetBillingAddressValidator : AbstractValidator<GetBillingAddress>
    {
        public GetBillingAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.BillingAddressId).NotEmpty();
        }
    }

    internal class GetBillingAddressHandler : IRequestHandler<GetBillingAddress, BillingAddressDTO>
    {
        private readonly IBillingAddressRepository _billingAddressRepository;

        public GetBillingAddressHandler(IBillingAddressRepository billingAddressRepository)
        {
            _billingAddressRepository = billingAddressRepository;
        }

        public async Task<BillingAddressDTO> Handle(GetBillingAddress request, CancellationToken cancellationToken)
        {
            var billingAddress = await _billingAddressRepository.GetByIdAsync(request.AccountId, request.BillingAddressId, cancellationToken);

            if (billingAddress == null)
            {
                throw new BillingAddressNotFoundException(request.AccountId, request.BillingAddressId);
            }

            return billingAddress.Adapt<BillingAddressDTO>();
        }
    }
}

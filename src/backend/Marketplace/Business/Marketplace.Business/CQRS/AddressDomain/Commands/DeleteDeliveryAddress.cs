using FluentValidation;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;

using MediatR;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class DeleteDeliveryAddress : IRequest
    {
        public DeleteDeliveryAddress(Guid accountId, int deliveryAddressId)
        {
            AccountId = accountId;
            DeliveryAddressId = deliveryAddressId;
        }

        public Guid AccountId { get; private set; }

        public int DeliveryAddressId { get; private set; }
    }

    internal class DeleteDeliveryAddressValidator : AbstractValidator<DeleteDeliveryAddress>
    {
        public DeleteDeliveryAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.DeliveryAddressId).NotEmpty();
        }
    }

    internal class DeleteDeliveryAddressHandler : IRequestHandler<DeleteDeliveryAddress>
    {
        private readonly IDeliveryAddressRepository _deliveryAddressRepository;

        public DeleteDeliveryAddressHandler(IDeliveryAddressRepository deliveryAddressRepository)
        {
            _deliveryAddressRepository = deliveryAddressRepository;
        }

        public async Task<Unit> Handle(DeleteDeliveryAddress request, CancellationToken cancellationToken)
        {
            var deliveryAddress = await _deliveryAddressRepository.GetByIdAsync(request.AccountId, request.DeliveryAddressId, cancellationToken);

            if (deliveryAddress == null)
            {
                throw new DeliveryAddressNotFoundException(request.AccountId, request.DeliveryAddressId);
            }

            await _deliveryAddressRepository.SoftDelete(deliveryAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

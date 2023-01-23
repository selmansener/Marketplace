using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.AddressDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;
using MediatR;

namespace Marketplace.Business.CQRS.AddressDomain.Queries
{
    public class GetDeliveryAddress : IRequest<DeliveryAddressDTO>
    {
        public GetDeliveryAddress(Guid accountId, int deliveryAddressId)
        {
            AccountId = accountId;
            DeliveryAddressId = deliveryAddressId;
        }

        public Guid AccountId { get; private set; }

        public int DeliveryAddressId { get; private set; }
    }

    internal class GetDeliveryAddressValidator : AbstractValidator<GetDeliveryAddress>
    {
        public GetDeliveryAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.DeliveryAddressId).NotEmpty();
        }
    }

    internal class GetDeliveryAddressHandler : IRequestHandler<GetDeliveryAddress, DeliveryAddressDTO>
    {
        private readonly IDeliveryAddressRepository _DeliveryAddressRepository;

        public GetDeliveryAddressHandler(IDeliveryAddressRepository DeliveryAddressRepository)
        {
            _DeliveryAddressRepository = DeliveryAddressRepository;
        }

        public async Task<DeliveryAddressDTO> Handle(GetDeliveryAddress request, CancellationToken cancellationToken)
        {
            var DeliveryAddress = await _DeliveryAddressRepository.GetByIdAsync(request.AccountId, request.DeliveryAddressId, cancellationToken);

            if (DeliveryAddress == null)
            {
                throw new DeliveryAddressNotFoundException(request.AccountId, request.DeliveryAddressId);
            }

            return DeliveryAddress.Adapt<DeliveryAddressDTO>();
        }
    }
}

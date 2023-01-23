using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.AddressDomain.DTOs;
using Marketplace.Data.Repositories.AddressDomain;
using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Business.CQRS.AddressDomain.Queries
{
    public class GetAllDeliveryAddresses : IRequest<IEnumerable<DeliveryAddressDTO>>
    {
        public GetAllDeliveryAddresses(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }
    }

    internal class GetAllDeliveryAddressesValidator : AbstractValidator<GetAllDeliveryAddresses>
    {
        public GetAllDeliveryAddressesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAllDeliveryAddressesHandler : IRequestHandler<GetAllDeliveryAddresses, IEnumerable<DeliveryAddressDTO>>
    {
        private readonly IDeliveryAddressRepository _DeliveryAddressRepository;

        public GetAllDeliveryAddressesHandler(IDeliveryAddressRepository DeliveryAddressRepository)
        {
            _DeliveryAddressRepository = DeliveryAddressRepository;
        }

        public async Task<IEnumerable<DeliveryAddressDTO>> Handle(GetAllDeliveryAddresses request, CancellationToken cancellationToken)
        {
            return await _DeliveryAddressRepository
                .GetAllAsNoTracking()
                .Where(x => x.AccountId == request.AccountId)
                .ProjectToType<DeliveryAddressDTO>()
                .ToListAsync(cancellationToken);
        }
    }
}

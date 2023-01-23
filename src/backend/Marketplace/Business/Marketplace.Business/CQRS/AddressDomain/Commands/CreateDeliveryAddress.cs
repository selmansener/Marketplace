﻿using FluentValidation;

using Marketplace.Data.Repositories.AddressDomain;
using Marketplace.Domains.Models.AddressDomain;

using MediatR;

using Newtonsoft.Json;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class CreateDeliveryAddress : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string? Email { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

        public string FullAddress { get; set; }
    }

    internal class CreateDeliveryAddressValidator : AbstractValidator<CreateDeliveryAddress>
    {
        public CreateDeliveryAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.District).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.ZipCode).NotEmpty();
            RuleFor(x => x.FullAddress).NotEmpty();
        }
    }

    internal class CreateDeliveryAddressHandler : IRequestHandler<CreateDeliveryAddress>
    {
        private readonly IDeliveryAddressRepository _deliveryAddressRepository;

        public CreateDeliveryAddressHandler(IDeliveryAddressRepository deliveryAddressRepository)
        {
            _deliveryAddressRepository = deliveryAddressRepository;
        }

        public async Task<Unit> Handle(CreateDeliveryAddress request, CancellationToken cancellationToken)
        {
            var deliveryAddress = new DeliveryAddress(
                request.AccountId,
                request.Name,
                request.FullName,
                request.Phone,
                request.Email,
                request.City,
                request.District,
                request.ZipCode,
                request.FullAddress);

            await _deliveryAddressRepository.AddAsync(deliveryAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

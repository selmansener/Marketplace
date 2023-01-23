using FluentValidation;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;

using MediatR;

using Newtonsoft.Json;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class UpdateDeliveryAddress : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int DeliveryAddressId { get; set; }

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

    internal class UpdateDeliveryAddressValidator : AbstractValidator<UpdateDeliveryAddress>
    {
        public UpdateDeliveryAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.DeliveryAddressId).NotEmpty();
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

    internal class UpdateDeliveryAddressHandler : IRequestHandler<UpdateDeliveryAddress>
    {

        private readonly IDeliveryAddressRepository _deliveryAddressRepository;

        public UpdateDeliveryAddressHandler(IDeliveryAddressRepository deliveryAddressRepository)
        {
            _deliveryAddressRepository = deliveryAddressRepository;
        }

        public async Task<Unit> Handle(UpdateDeliveryAddress request, CancellationToken cancellationToken)
        {
            var deliveryAddress = await _deliveryAddressRepository.GetByIdAsync(request.AccountId, request.DeliveryAddressId, cancellationToken);

            if (deliveryAddress == null)
            {
                throw new DeliveryAddressNotFoundException(request.AccountId, request.DeliveryAddressId);
            }

            deliveryAddress.Update(request.Name, request.FullName, request.Phone, request.Email, request.City, request.District, request.ZipCode, request.FullAddress);

            await _deliveryAddressRepository.UpdateAsync(deliveryAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

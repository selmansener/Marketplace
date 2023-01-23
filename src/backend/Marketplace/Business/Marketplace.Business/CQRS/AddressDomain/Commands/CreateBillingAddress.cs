using FluentValidation;

using Marketplace.Data.Repositories.AddressDomain;
using Marketplace.Domains.Models.AddressDomain;
using Marketplace.Infrastructure.Shared.Enums;

using MediatR;

using Newtonsoft.Json;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class CreateBillingAddress : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public BillingType Type { get; set; }

        public string Name { get; set; }

        public string FullName { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }

        public string? TCKN { get; set; }

        public string? TaxNumber { get; set; }

        public string? TaxOffice { get; set; }

        public string City { get; set; }

        public string District { get; set; }

        public string Country { get; set; }

        public string ZipCode { get; set; }

        public string FullAddress { get; set; }
    }

    internal class CreateBillingAddressValidator : AbstractValidator<CreateBillingAddress>
    {
        public CreateBillingAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.TCKN).NotEmpty().When(x => x.Type == BillingType.Individual);
            RuleFor(x => x.TaxNumber).NotEmpty().When(x => x.Type == BillingType.Corporate);
            RuleFor(x => x.TaxOffice).NotEmpty().When(x => x.Type == BillingType.Corporate);
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.District).NotEmpty();
            RuleFor(x => x.Country).NotEmpty();
            RuleFor(x => x.ZipCode).NotEmpty();
            RuleFor(x => x.FullAddress).NotEmpty();
        }
    }

    internal class CreateBillingAddressHandler : IRequestHandler<CreateBillingAddress, Unit>
    {
        readonly IBillingAddressRepository _billingAddressRepository;

        public CreateBillingAddressHandler(IBillingAddressRepository billingAddressRepository)
        {
            _billingAddressRepository = billingAddressRepository;
        }

        public async Task<Unit> Handle(CreateBillingAddress request, CancellationToken cancellationToken)
        {
            var billingAddress = new BillingAddress(
                request.AccountId,
                request.Name,
                request.Type,
                request.FullName,
                request.Phone,
                request.Email,
                request.TCKN,
                request.TaxNumber,
                request.TaxOffice,
                request.City,
                request.District,
                request.ZipCode,
                request.FullAddress);

            await _billingAddressRepository.AddAsync(billingAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

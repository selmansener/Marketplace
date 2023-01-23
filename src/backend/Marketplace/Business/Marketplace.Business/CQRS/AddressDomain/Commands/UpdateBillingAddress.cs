using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AddressDomain;
using Marketplace.Infrastructure.Shared.Enums;

using MediatR;

using Newtonsoft.Json;

namespace Marketplace.Business.CQRS.AddressDomain.Commands
{
    public class UpdateBillingAddress : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        [JsonIgnore]
        public int BillingAddressId { get; set; }

        public string Name { get; set; }

        public BillingType Type { get; set; }

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

    internal class UpdateBillingAddressValidator : AbstractValidator<UpdateBillingAddress>
    {
        public UpdateBillingAddressValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.BillingAddressId).NotEmpty();
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

    internal class UpdateBillingAddressHandler : IRequestHandler<UpdateBillingAddress>
    {
        readonly IBillingAddressRepository _billingAddressRepository;

        public UpdateBillingAddressHandler(IBillingAddressRepository billingAddressRepository)
        {
            _billingAddressRepository = billingAddressRepository;
        }

        public async Task<Unit> Handle(UpdateBillingAddress request, CancellationToken cancellationToken)
        {
            var billingAddress = await _billingAddressRepository.GetByIdAsync(request.AccountId, request.BillingAddressId, cancellationToken);

            if (billingAddress == null)
            {
                throw new BillingAddressNotFoundException(request.AccountId, request.BillingAddressId);
            }

            billingAddress.Update(request.Type, request.Name, request.FullName, request.Phone, request.Email, request.TCKN, request.TaxNumber, request.TaxOffice, request.City, request.District, request.ZipCode, request.FullAddress);

            await _billingAddressRepository.UpdateAsync(billingAddress, cancellationToken);

            return Unit.Value;
        }
    }
}

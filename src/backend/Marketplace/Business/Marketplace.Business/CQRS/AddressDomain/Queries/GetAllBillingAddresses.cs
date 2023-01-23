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
    public class GetAllBillingAddresses : IRequest<IEnumerable<BillingAddressDTO>>
    {
        public GetAllBillingAddresses(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }
    }

    internal class GetAllBillingAddressesValidator : AbstractValidator<GetAllBillingAddresses>
    {
        public GetAllBillingAddressesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAllBillingAddressesHandler : IRequestHandler<GetAllBillingAddresses, IEnumerable<BillingAddressDTO>>
    {
        private readonly IBillingAddressRepository _billingAddressRepository;

        public GetAllBillingAddressesHandler(IBillingAddressRepository billingAddressRepository)
        {
            _billingAddressRepository = billingAddressRepository;
        }

        public async Task<IEnumerable<BillingAddressDTO>> Handle(GetAllBillingAddresses request, CancellationToken cancellationToken)
        {
            return await _billingAddressRepository
                .GetAllAsNoTracking()
                .Where(x => x.AccountId == request.AccountId)
                .ProjectToType<BillingAddressDTO>()
                .ToListAsync(cancellationToken);
        }
    }
}

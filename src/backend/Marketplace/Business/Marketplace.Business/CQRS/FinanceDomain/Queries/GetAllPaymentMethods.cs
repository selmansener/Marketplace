using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.FinanceDomain.DTOs;
using Marketplace.Data.Repositories.FinanceDomain;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Business.CQRS.FinanceDomain.Queries
{
    public class GetAllPaymentMethods : IRequest<IEnumerable<PaymentMethodDTO>>
    {
        public GetAllPaymentMethods(Guid accountId)
        {
            AccountId = accountId;
        }

        public Guid AccountId { get; private set; }
    }

    internal class GetAllPaymentMethodsValidator : AbstractValidator<GetAllPaymentMethods>
    {
        public GetAllPaymentMethodsValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class GetAllPaymentMethodsHandler : IRequestHandler<GetAllPaymentMethods, IEnumerable<PaymentMethodDTO>>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public GetAllPaymentMethodsHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<IEnumerable<PaymentMethodDTO>> Handle(GetAllPaymentMethods request, CancellationToken cancellationToken)
        {
            return await _paymentMethodRepository
                .GetAllAsNoTracking()
                .Where(x => x.AccountId == request.AccountId)
                .ProjectToType<PaymentMethodDTO>()
                .ToListAsync(cancellationToken);
        }
    }
}

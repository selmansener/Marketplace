using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.FinanceDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.FinanceDomain;

using MediatR;

namespace Marketplace.Business.CQRS.FinanceDomain.Queries
{
    public class GetPaymentMethod : IRequest<PaymentMethodDTO>
    {
        public GetPaymentMethod(Guid accountId, int paymentMethodId)
        {
            AccountId = accountId;
            PaymentMethodId = paymentMethodId;
        }

        public Guid AccountId { get; private set; }

        public int PaymentMethodId { get; private set; }
    }

    internal class GetPaymentMethodValidator : AbstractValidator<GetPaymentMethod>
    {
        public GetPaymentMethodValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.PaymentMethodId).NotEmpty();
        }
    }

    internal class GetPaymentMethodHandler : IRequestHandler<GetPaymentMethod, PaymentMethodDTO>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;

        public GetPaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
        }

        public async Task<PaymentMethodDTO> Handle(GetPaymentMethod request, CancellationToken cancellationToken)
        {
            var paymentMethod = await _paymentMethodRepository.GetByIdAsync(request.AccountId, request.PaymentMethodId, cancellationToken);

            if (paymentMethod == null)
            {
                throw new PaymentMethodNotFoundException(request.AccountId, request.PaymentMethodId);
            }

            return paymentMethod.Adapt<PaymentMethodDTO>();
        }
    }
}

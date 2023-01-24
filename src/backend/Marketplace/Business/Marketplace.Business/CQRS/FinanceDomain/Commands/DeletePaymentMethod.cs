using FluentValidation;

using Iyzipay.Model;
using Iyzipay.Request;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.FinanceDomain;
using Marketplace.Infrastructure.Shared.Configurations;

using MediatR;

using Microsoft.Extensions.Options;

namespace Marketplace.Business.CQRS.FinanceDomain.Commands
{
    public class DeletePaymentMethod : IRequest
    {
        public DeletePaymentMethod(Guid accountId, int paymentMethodId)
        {
            AccountId = accountId;
            PaymentMethodId = paymentMethodId;
        }

        public Guid AccountId { get; private set; }

        public int PaymentMethodId { get; private set; }
    }

    internal class DeletePaymentMethodValidator : AbstractValidator<DeletePaymentMethod>
    {
        public DeletePaymentMethodValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.PaymentMethodId).NotEmpty();
        }
    }

    internal class DeletePaymentMethodHandler : IRequestHandler<DeletePaymentMethod>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public DeletePaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository, IOptions<IyzicoAPIOptions> iyzicoAPIOptions)
        {
            _paymentMethodRepository = paymentMethodRepository;
            _iyzicoAPIOptions = iyzicoAPIOptions.Value;
        }

        public async Task<Unit> Handle(DeletePaymentMethod request, CancellationToken cancellationToken)
        {
            var paymentMethod = await _paymentMethodRepository.GetByIdAsync(request.AccountId, request.PaymentMethodId, cancellationToken);

            if (paymentMethod == null)
            {
                throw new PaymentMethodNotFoundException(request.AccountId, request.PaymentMethodId);
            }

            DeleteCardRequest deleteCardRequest = new DeleteCardRequest
            {
                CardToken = paymentMethod.CardToken,
                CardUserKey = paymentMethod.CardUserKey,
            };

            Card card = Card.Delete(deleteCardRequest, new Iyzipay.Options
            {
                ApiKey = _iyzicoAPIOptions.APIKey,
                BaseUrl = _iyzicoAPIOptions.BaseUrl,
                SecretKey = _iyzicoAPIOptions.SecretKey
            });

            if (card.Status == "success")
            {
                if (card.ConversationId != deleteCardRequest.ConversationId)
                {
                    throw new PaymentMethodConversationIdException(deleteCardRequest.ConversationId, card.ConversationId);
                }

                await _paymentMethodRepository.SoftDelete(paymentMethod, cancellationToken);
            }
            else
            {
                throw new DeletePaymentMethodFailureException(card.ErrorMessage);
            }

            return Unit.Value;
        }
    }
}

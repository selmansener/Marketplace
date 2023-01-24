using FluentValidation;

using Iyzipay.Model;
using Iyzipay.Request;

using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.AccountDomain;
using Marketplace.Data.Repositories.FinanceDomain;
using Marketplace.Domains.Models.FinanceDomain;
using Marketplace.Infrastructure.Shared.Configurations;

using MediatR;

using Microsoft.Extensions.Options;

using Newtonsoft.Json;

namespace Marketplace.Business.CQRS.FinanceDomain.Commands
{
    public class CreatePaymentMethod : IRequest
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }

        public string CardName { get; set; }

        public string CardNumber { get; set; }

        public string CardHolderName { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }
    }

    internal class CreatePaymentMethodValidator : AbstractValidator<CreatePaymentMethod>
    {
        public CreatePaymentMethodValidator()
        {
            RuleFor(x => x.CardName).NotEmpty();
            RuleFor(x => x.AccountId).NotEmpty();
            RuleFor(x => x.CardNumber).NotEmpty();
            RuleFor(x => x.CardHolderName).NotEmpty();
            RuleFor(x => x.ExpireMonth).NotEmpty();
            RuleFor(x => x.ExpireYear).NotEmpty();
        }
    }

    internal class CreatePaymentMethodHandler : IRequestHandler<CreatePaymentMethod>
    {
        private readonly IPaymentMethodRepository _paymentMethodRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public CreatePaymentMethodHandler(IPaymentMethodRepository paymentMethodRepository, IOptions<IyzicoAPIOptions> iyzicoAPIOptions, IAccountRepository accountRepository)
        {
            _paymentMethodRepository = paymentMethodRepository;
            _iyzicoAPIOptions = iyzicoAPIOptions.Value;
            _accountRepository = accountRepository;
        }

        public async Task<Unit> Handle(CreatePaymentMethod request, CancellationToken cancellationToken)
        {
            var account = await _accountRepository.GetByIdAsync(request.AccountId, cancellationToken);

            if (account == null)
            {
                throw new AccountNotFoundException(request.AccountId);
            }

            CreateCardRequest cardRequest = new CreateCardRequest
            {
                Locale = Locale.TR.ToString(),
                ConversationId = Guid.NewGuid().ToString(),
                Email = account.Email,
            };

            CardInformation cardInformation = new CardInformation
            {
                CardAlias = request.CardName,
                CardHolderName = request.CardHolderName,
                CardNumber = request.CardNumber.Replace(" ", string.Empty),
                ExpireMonth = request.ExpireMonth,
                ExpireYear = request.ExpireYear,
            };

            cardRequest.Card = cardInformation;

            Card card = Card.Create(cardRequest, new Iyzipay.Options
            {
                ApiKey = _iyzicoAPIOptions.APIKey,
                BaseUrl = _iyzicoAPIOptions.BaseUrl,
                SecretKey = _iyzicoAPIOptions.SecretKey
            });

            if (card.Status == "success")
            {
                if (card.ConversationId != cardRequest.ConversationId)
                {
                    throw new PaymentMethodConversationIdException(cardRequest.ConversationId, card.ConversationId);
                }

                var paymentMethod = new PaymentMethod(request.AccountId, request.CardName, card.CardUserKey, card.CardToken, card.CardAssociation, card.CardFamily, card.CardBankName, card.CardBankCode, card.BinNumber);

                await _paymentMethodRepository.AddAsync(paymentMethod, cancellationToken);
            }
            else
            {
                throw new CreatePaymentMethodFailureException(card.ErrorMessage);
            }

            return Unit.Value;
        }
    }
}

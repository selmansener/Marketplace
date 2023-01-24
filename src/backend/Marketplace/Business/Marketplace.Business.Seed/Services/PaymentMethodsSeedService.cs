using System.Collections.Immutable;

using Iyzipay.Model;

using Iyzipay.Request;

using Marketplace.Business.Seed.Configuration;
using Marketplace.Data.DataAccess;
using Marketplace.Domains.Models.FinanceDomain;
using Marketplace.Infrastructure.Shared.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Marketplace.Business.Seed.Services
{
    internal class PaymentMethodsSeedService : BaseSeedService
    {
        private readonly IyzicoAPIOptions _iyzicoAPIOptions;

        public PaymentMethodsSeedService(MarketplaceDbContext dbContext, IOptions<IyzicoAPIOptions> iyzicoAPIOptions)
            : base(dbContext)
        {
            _iyzicoAPIOptions = iyzicoAPIOptions.Value;
        }

        protected override ImmutableList<SeedServiceType> Dependencies => ImmutableList.Create(SeedServiceType.Users);

        public override async Task Execute(CancellationToken cancellationToken)
        {
            var accounts = await _dbContext.Accounts.ToListAsync(cancellationToken);

            var creditCards = new List<string>
            {
                "5526080000000006",
                "4603450000000000",
                "5311570000000005",
                "5528790000000008",
                "5504720000000003",
                "4543590000000006",
                "4157920000000002"
            };

            var paymentMethods = new List<PaymentMethod>();
            foreach (var account in accounts)
            {
                CreateCardRequest cardRequest = new CreateCardRequest
                {
                    Locale = Locale.TR.ToString(),
                    ConversationId = Guid.NewGuid().ToString(),
                    Email = account.Email,
                };

                var expireMonth = _faker.Random.Int(min: 1, max: 12).ToString();
                expireMonth = expireMonth.Length == 1 ? expireMonth.PadLeft(1, '0') : expireMonth;

                CardInformation cardInformation = new CardInformation
                {
                    CardAlias = "Credit Card",
                    CardHolderName = $"{account.FirstName} {account.LastName}",
                    CardNumber = _faker.PickRandom(creditCards),
                    ExpireMonth = expireMonth,
                    ExpireYear = _faker.Random.Int(min: DateTime.UtcNow.AddYears(1).Year, max: DateTime.UtcNow.AddYears(5).Year).ToString()
                };

                cardRequest.Card = cardInformation;

                Card card = Card.Create(cardRequest, new Iyzipay.Options
                {
                    ApiKey = _iyzicoAPIOptions.APIKey,
                    BaseUrl = _iyzicoAPIOptions.BaseUrl,
                    SecretKey = _iyzicoAPIOptions.SecretKey
                });

                if (card.Status != "success")
                {
                    throw new InvalidOperationException("Create card request failed.");
                }

                var paymentMethod = new PaymentMethod(account.Id, card.CardAlias, card.CardUserKey, card.CardToken, card.CardAssociation, card.CardFamily, card.CardBankName, card.CardBankCode, card.BinNumber);

                paymentMethods.Add(paymentMethod);
            }

            await _dbContext.AddRangeAsync(paymentMethods);
        }
    }
}

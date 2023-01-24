using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Base;
using Marketplace.Domains.Models.AccountDomain;

namespace Marketplace.Domains.Models.FinanceDomain
{
    public class PaymentMethod : BaseEntity
    {
        public PaymentMethod(Guid accountId, string cardName, string cardUserKey, string cardToken, string cardAssociation, string cardFamily, string cardBankName, long? cardBankCode, string binNumber)
        {
            AccountId = accountId;
            CardName = cardName;
            CardUserKey = cardUserKey;
            CardToken = cardToken;
            CardAssociation = cardAssociation;
            CardFamily = cardFamily;
            CardBankName = cardBankName;
            CardBankCode = cardBankCode;
            BinNumber = binNumber;
        }

        public Guid AccountId { get; private set; }

        public Account Account { get; private set; }

        public string CardName { get; private set; }

        public string CardUserKey { get; private set; }

        public string CardToken { get; private set; }

        public string CardAssociation { get; private set; }

        public string CardFamily { get; private set; }

        public string CardBankName { get; private set; }

        public long? CardBankCode { get; private set; }

        public string BinNumber { get; private set; }
    }
}

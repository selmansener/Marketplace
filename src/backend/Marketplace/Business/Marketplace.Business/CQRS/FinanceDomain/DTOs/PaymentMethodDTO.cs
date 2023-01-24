namespace Marketplace.Business.CQRS.FinanceDomain.DTOs
{
    public class PaymentMethodDTO
    {
        public int Id { get; set; }

        public string CardAssociation { get; set; }

        public string CardFamily { get; set; }

        public string CardBankName { get; set; }

        public long? CardBankCode { get; set; }

        public string BinNumber { get; set; }

        public string CardName { get; set; }
    }
}


using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Marketplace.Domains.Models.SalesOrderDomain;

namespace Marketplace.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderBillingAddressEntityConfiguration : IEntityTypeConfiguration<SalesOrderBillingAddress>
    {
        public void Configure(EntityTypeBuilder<SalesOrderBillingAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(SalesOrderBillingAddress)}_Seq");

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.BillingAddress)
                .HasForeignKey<SalesOrderBillingAddress>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

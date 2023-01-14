
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Marketplace.Domains.Models.SalesOrderDomain;

namespace Marketplace.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderDeliveryAddressEntityConfiguration : IEntityTypeConfiguration<SalesOrderDeliveryAddress>
    {
        public void Configure(EntityTypeBuilder<SalesOrderDeliveryAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(SalesOrderDeliveryAddress)}_Seq");

            builder.HasOne(x => x.SalesOrder)
                .WithOne(x => x.DeliveryAddress)
                .HasForeignKey<SalesOrderDeliveryAddress>(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

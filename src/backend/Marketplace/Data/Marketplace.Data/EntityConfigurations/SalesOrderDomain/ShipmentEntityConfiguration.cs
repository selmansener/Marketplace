
using Marketplace.Domains.Models.SalesOrderDomain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Data.EntityConfigurations.SalesOrderDomain
{
    internal class ShipmentEntityConfiguration : IEntityTypeConfiguration<Shipment>
    {
        public void Configure(EntityTypeBuilder<Shipment> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(Shipment)}_Seq");

            builder.HasOne(x => x.SalesOrder)
                .WithMany(x => x.Shipments)
                .HasForeignKey(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

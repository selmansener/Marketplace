
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Marketplace.Domains.Models.SalesOrderDomain;

namespace Marketplace.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderEntityConfiguration : IEntityTypeConfiguration<SalesOrder>
    {
        public void Configure(EntityTypeBuilder<SalesOrder> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(SalesOrder)}_Seq");
        }
    }
}

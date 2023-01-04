using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Marketplace.Domains.Models.SalesOrderDomain;

namespace Marketplace.Data.EntityConfigurations.SalesOrderDomain
{
    internal class SalesOrderLineItemEntityConfiguration : IEntityTypeConfiguration<SalesOrderLineItem>
    {
        public void Configure(EntityTypeBuilder<SalesOrderLineItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(SalesOrderLineItem)}_Seq");

            builder.HasOne(x => x.SalesOrder)
                .WithMany(x => x.LineItems)
                .HasForeignKey(x => x.SalesOrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

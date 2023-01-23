using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Marketplace.Domains.Models.AddressDomain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Data.EntityConfigurations.AddressDomain
{
    internal class BillingAddressEntityConfiguration : IEntityTypeConfiguration<BillingAddress>
    {
        public void Configure(EntityTypeBuilder<BillingAddress> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(BillingAddress)}_Seq");

            var details = builder.OwnsOne(x => x.Details);
            details.Property(x => x.FullAddress).HasMaxLength(4000);

            builder.Property(x => x.FullName).HasMaxLength(250);
            builder.Property(x => x.Email).HasMaxLength(250);
            builder.Property(x => x.TaxOffice).HasMaxLength(250);

            builder.HasOne(x => x.Account)
                .WithMany()
                .HasForeignKey(x => x.AccountId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}


using Marketplace.Domains.Models.ProductDomain;
using Marketplace.Infrastructure.Shared.Enums;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Data.EntityConfigurations.ProductDomain
{
    internal class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(Product)}_Seq");

            builder.Property(x => x.Gender).IsRequired().HasDefaultValue(Gender.Unisex).HasConversion<string>();

            builder.Property(x => x.Colors).IsRequired().HasConversion<string>(
               v => v.Count > 0 ? string.Join(",", v) : string.Empty,
               v => !string.IsNullOrEmpty(v) ? v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList() : new List<string>()
            ).HasMaxLength(1000);
        }
    }
}

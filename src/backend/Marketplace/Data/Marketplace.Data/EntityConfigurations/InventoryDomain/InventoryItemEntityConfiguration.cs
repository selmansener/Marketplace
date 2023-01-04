
using Marketplace.Domains.Models.InventoryDomain;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Marketplace.Data.EntityConfigurations.InventoryDomain
{
    internal class InventoryItemEntityConfiguration : IEntityTypeConfiguration<InventoryItem>
    {
        public void Configure(EntityTypeBuilder<InventoryItem> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseHiLo($"{nameof(InventoryItem)}_Seq");
        }
    }
}


using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Marketplace.Domains.Models.AccountDomain;

namespace Modilist.Data.EntityConfigurations.UserDomain
{
    internal class AccountEntityConfiguration : IEntityTypeConfiguration<Account>
    {
        public void Configure(EntityTypeBuilder<Account> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => new {  x.Email, x.DeletedAt })
                .IsUnique();

            builder.Property(x => x.State).HasConversion<string>().IsRequired();
            builder.Property(x => x.Gender).HasConversion<string>().IsRequired();
        }
    }
}

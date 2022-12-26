using System.Collections.Immutable;

using Marketplace.Domains.Models.AccountDomain;

namespace Marketplace.Business.Seed.Data
{
    internal class SeedData
    {
        public ImmutableList<Account> Users { get; set; }
    }
}

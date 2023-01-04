using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Infrastructure.Shared.Enums
{
    public enum ProductState
    {
        None = 0,
        InReview = 1,
        Available = 2,
        OutOfStock = 3,
        MissingInfo = 4,
        Rejected = 5,
        Passive = 6
    }
}

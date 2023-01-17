using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Marketplace.Business.Exceptions
{
    internal class ProductNotFoundException : Exception
    {
        public ProductNotFoundException(int productId)
            : base($"Product not found with Id: {productId}")
        {
            ProductId = productId;
        }

        public int ProductId { get; private set; }
    }
}

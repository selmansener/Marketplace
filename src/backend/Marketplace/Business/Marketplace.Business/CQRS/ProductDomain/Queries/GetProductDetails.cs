using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.ProductDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.ProductDomain;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Business.CQRS.ProductDomain.Queries
{
    public class GetProductDetails : IRequest<ProductDetailsDTO>
    {
        public GetProductDetails(int productId)
        {
            ProductId = productId;
        }

        public int ProductId { get; }
    }

    internal class GetProductDetailsValidator : AbstractValidator<GetProductDetails>
    {
        public GetProductDetailsValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
        }
    }

    internal class GetProductDetailsHandler : IRequestHandler<GetProductDetails, ProductDetailsDTO>
    {
        private readonly IProductRepository _productRepository;

        public GetProductDetailsHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDetailsDTO> Handle(GetProductDetails request, CancellationToken cancellationToken)
        {
            var product = await _productRepository
                .GetAllAsNoTracking()
                .ProjectToType<ProductDetailsDTO>()
                .FirstOrDefaultAsync(x => x.Id == request.ProductId, cancellationToken);

            if (product == null)
            {
                throw new ProductNotFoundException(request.ProductId);
            }

            return product;
        }
    }
}

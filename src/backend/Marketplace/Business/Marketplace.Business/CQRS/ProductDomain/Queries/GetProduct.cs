
using FluentValidation;

using Mapster;

using Marketplace.Business.CQRS.ProductDomain.DTOs;
using Marketplace.Business.Exceptions;
using Marketplace.Data.Repositories.ProductDomain;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace Marketplace.Business.CQRS.ProductDomain.Queries
{
    public class GetProduct : IRequest<ProductDTO>
    {
        public GetProduct(int productId)
        {
            ProductId = productId;
        }

        public int ProductId { get; private set; }
    }

    internal class GetProductValidator : AbstractValidator<GetProduct>
    {
        public GetProductValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty();
        }
    }

    internal class GetProductHandler : IRequestHandler<GetProduct, ProductDTO>
    {
        private readonly IProductRepository _productRepository;

        public GetProductHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ProductDTO> Handle(GetProduct request, CancellationToken cancellationToken)
        {
            var product = await _productRepository
                .GetAllAsNoTracking()
                .ProjectToType<ProductDTO>()
                .FirstOrDefaultAsync(x => x.Id == request.ProductId, cancellationToken);

            if (product == null)
            {
                throw new ProductNotFoundException(request.ProductId);
            }

            return product;
        }
    }
}

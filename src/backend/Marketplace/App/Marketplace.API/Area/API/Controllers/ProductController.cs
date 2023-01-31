using Marketplace.API.Models;
using Marketplace.Business.CQRS.ProductDomain.DTOs;
using Marketplace.Business.CQRS.ProductDomain.Queries;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    public class ProductController : APIBaseController
    {
        private readonly IMediator _meditor;

        public ProductController(IMediator meditor)
        {
            _meditor = meditor;
        }

        [HttpGet("{productId}")]
        [ProducesResponseType(typeof(ResponseModel<ProductDetailsDTO>), 200)]
        public async Task<IActionResult> Get(int productId, CancellationToken cancellationToken)
        {
            var response = await _meditor.Send(new GetProductDetails(productId), cancellationToken);

            return Ok(new ResponseModel<ProductDetailsDTO>(response));
        }
    }
}

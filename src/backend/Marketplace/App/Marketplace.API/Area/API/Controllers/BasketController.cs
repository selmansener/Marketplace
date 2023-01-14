using Marketplace.Infrastructure.Shared.Extensions;

using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    public class BasketController : APIBaseController
    {
        [HttpGet("Get")]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            return Ok();
        }
    }
}

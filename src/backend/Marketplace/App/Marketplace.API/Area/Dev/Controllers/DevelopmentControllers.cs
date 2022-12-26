using Marketplace.API.Filters;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;

using Marketplace.API.Filters;
using Marketplace.Business.Seed;
using Marketplace.Business.Seed.Configuration;
using Marketplace.Infrastructure.Shared.Extensions;

namespace Marketplace.API.Area.Dev.Controllers
{
    [ApiController]
    [Area("dev")]
    [Route("[area]/v{v:apiVersion}")]
    [Authorize("Development")]
    [ApiKey]
    public class DevelopmentController : Controller
    {
        private readonly ISeeder _seeder;
        private readonly IHostEnvironment _hostEnvironment;

        public DevelopmentController(ISeeder seeder, IHostEnvironment hostEnvironment)
        {
            _seeder = seeder;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost("Seed")]
        public async Task<IActionResult> Seed(SeedServiceType seedServiceType, CancellationToken cancellationToken, bool recreateDb = false)
        {
            if (_hostEnvironment.IsProduction())
            {
                return StatusCode(405);
            }

            if (recreateDb)
            {
                _seeder.ClearExecutedServices();
            }

            await _seeder.Seed(seedServiceType, cancellationToken);

            return NoContent();
        }

        [HttpGet("GetClientIP")]
        public IActionResult GetClientIP()
        {
            var ipAddress = Request.HttpContext.Connection.RemoteIpAddress;
            return Ok(new { IPAdress = ipAddress?.ToString() });
        }
    }
}

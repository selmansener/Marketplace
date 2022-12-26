using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    [ApiController]
    [Area("api")]
    [Route("[area]/v1/[controller]")]
    public abstract class APIBaseController : Controller
    {
    }
}

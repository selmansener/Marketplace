using Marketplace.API.Configurations;
using Marketplace.Business.CQRS.AccountDomain.DTOs;
using Marketplace.Business.CQRS.AccountDomain.Queries;
using Marketplace.Infrastructure.Shared.Extensions;

using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web;

using System.Security.Principal;

namespace Marketplace.API.Area.API.Controllers
{
    public class AccountController : APIBaseController
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.Accounts))]
        [HttpGet("Get")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Get(CancellationToken cancellationToken)
        {
            var account = await _mediator.Send(new GetAccount { Id = User.GetUserId() }, cancellationToken);

            return Ok();
        }
    }
}

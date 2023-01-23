using Marketplace.API.Configurations;
using Marketplace.API.Models;
using Marketplace.Business.CQRS.AddressDomain.Commands;
using Marketplace.Business.CQRS.AddressDomain.DTOs;
using Marketplace.Business.CQRS.AddressDomain.Queries;
using Marketplace.Infrastructure.Shared.Extensions;

using MediatR;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    public class BillingAddressController : APIBaseController
    {
        private readonly IMediator _mediator;

        public BillingAddressController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetAll")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<IEnumerable<BillingAddressDTO>>))]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllBillingAddresses(User.GetUserId()), cancellationToken);

            return Ok(new ResponseModel<IEnumerable<BillingAddressDTO>>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("{billingAddressId}")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<BillingAddressDTO>))]
        public async Task<IActionResult> Get(int billingAddressId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetBillingAddress(User.GetUserId(), billingAddressId), cancellationToken);

            return Ok(new ResponseModel<BillingAddressDTO>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("Create")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Create(CreateBillingAddress command, CancellationToken cancellationToken)
        {
            command.AccountId = User.GetUserId();
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("{billingAddressId}/Update")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(int billingAddressId, UpdateBillingAddress command, CancellationToken cancellationToken)
        {
            command.AccountId = User.GetUserId();
            command.BillingAddressId = billingAddressId;
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("{billingAddressId}/Delete")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(int billingAddressId, CancellationToken cancellationToken)
        {
            await _mediator.Send(new DeleteBillingAddress(User.GetUserId(), billingAddressId), cancellationToken);

            return Ok();
        }
    }
}

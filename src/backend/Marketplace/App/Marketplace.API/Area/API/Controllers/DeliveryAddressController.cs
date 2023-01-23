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
    public class DeliveryAddressController : APIBaseController
    {
        private readonly IMediator _mediator;

        public DeliveryAddressController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("GetAll")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<IEnumerable<DeliveryAddressDTO>>))]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllDeliveryAddresses(User.GetUserId()), cancellationToken);

            return Ok(new ResponseModel<IEnumerable<DeliveryAddressDTO>>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpGet("{deliveryAddressId}")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<DeliveryAddressDTO>))]
        public async Task<IActionResult> Get(int deliveryAddressId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetDeliveryAddress(User.GetUserId(), deliveryAddressId), cancellationToken);

            return Ok(new ResponseModel<DeliveryAddressDTO>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("Create")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Create(CreateDeliveryAddress command, CancellationToken cancellationToken)
        {
            command.AccountId = User.GetUserId();
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("{deliveryAddressId}/Update")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Update(int deliveryAddressId, UpdateDeliveryAddress command, CancellationToken cancellationToken)
        {
            command.AccountId = User.GetUserId();
            command.DeliveryAddressId = deliveryAddressId;
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.Addresses))]
        [HttpPost("{deliveryAddressId}/Delete")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(int deliveryAddressId, CancellationToken cancellationToken)
        {
            await _mediator.Send(new DeleteDeliveryAddress(User.GetUserId(), deliveryAddressId), cancellationToken);

            return Ok();
        }
    }
}

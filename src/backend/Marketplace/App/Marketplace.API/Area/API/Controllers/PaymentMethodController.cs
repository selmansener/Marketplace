using Marketplace.API.Configurations;
using Marketplace.API.Models;
using Marketplace.Business.CQRS.AddressDomain.Commands;
using Marketplace.Business.CQRS.AddressDomain.DTOs;
using Marketplace.Business.CQRS.AddressDomain.Queries;
using Marketplace.Business.CQRS.FinanceDomain.Commands;
using Marketplace.Business.CQRS.FinanceDomain.DTOs;
using Marketplace.Business.CQRS.FinanceDomain.Queries;
using Marketplace.Domains.Models.FinanceDomain;
using Marketplace.Infrastructure.Shared.Extensions;

using MediatR;

using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    public class PaymentMethodController : APIBaseController
    {
        private readonly IMediator _mediator;

        public PaymentMethodController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpGet("GetAll")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<IEnumerable<PaymentMethodDTO>>))]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetAllPaymentMethods(User.GetUserId()), cancellationToken);

            return Ok(new ResponseModel<IEnumerable<PaymentMethodDTO>>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpGet("{paymentMethodId}")]
        [ProducesResponseType(200, Type = typeof(ResponseModel<PaymentMethodDTO>))]
        public async Task<IActionResult> Get(int paymentMethodId, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new GetPaymentMethod(User.GetUserId(), paymentMethodId), cancellationToken);

            return Ok(new ResponseModel<PaymentMethodDTO>(response));
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpPost("Create")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Create(CreatePaymentMethod command, CancellationToken cancellationToken)
        {
            command.AccountId = User.GetUserId();
            await _mediator.Send(command, cancellationToken);

            return Ok();
        }

        [Authorize(nameof(AuthorizationPermissions.PaymentMethods))]
        [HttpPost("{paymentMethodId}/Delete")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Delete(int paymentMethodId, CancellationToken cancellationToken)
        {
            await _mediator.Send(new DeletePaymentMethod(User.GetUserId(), paymentMethodId), cancellationToken);

            return Ok();
        }
    }
}

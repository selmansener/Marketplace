using Marketplace.Business.Utils.AddressDomain;
using Marketplace.Business.Utils.AddressDomain.Models;

using Microsoft.AspNetCore.Mvc;

namespace Marketplace.API.Area.API.Controllers
{
    public class AddressController : APIBaseController
    {
        private readonly IAddressService _addressService;

        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [HttpGet("GetCities")]
        [ProducesResponseType(typeof(IEnumerable<City>), 200)]
        public IActionResult GetCities()
        {
            return Ok(_addressService.GetCities());
        }

        [HttpGet("GetDistricts/{cityCode}")]
        [ProducesResponseType(typeof(IEnumerable<District>), 200)]
        public IActionResult GetDistricts(string cityCode)
        {
            return Ok(_addressService.GetDistricts(cityCode));
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Repository;

namespace ControllersMangaDB.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerHamedController : ControllerBase
    {
        private readonly ViewAllShops _viewAllShops;

        public CustomerHamedController(
            ViewAllShops viewAllShops
        )
        {
            _viewAllShops = viewAllShops;
        }

        [HttpGet]
        [Route("shops")]
        public async Task<IActionResult> GetShops()
        {
            try
            {
                var shops = await _viewAllShops.GetAllShopsAsync();
                return Ok(shops);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving offered shops." });
            }
        }
    }
}

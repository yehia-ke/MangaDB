using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.Repository;

namespace ControllersMangaDB.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerGaafarController : ControllerBase
    {
        private readonly ViewAllOfferedServicePlans _viewAllOfferedServicePlans;

        public CustomerGaafarController(
            ViewAllOfferedServicePlans viewAllOfferedServicePlans

            )
        {
            _viewAllOfferedServicePlans = viewAllOfferedServicePlans;
        }

        // 2. View details for all offered service plans.
        [HttpGet]
        [Route("service-plans")]
        public async Task<IActionResult> GetOfferedServicePlans()
        {
            try
            {
                var servicePlans = await _viewAllOfferedServicePlans.GetAllOfferedServicePlansAsync();
                return Ok(servicePlans);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving offered service plans." });
            }
        }

        // 3.  the total usage of the input account on each subscribed plan from a given input date.
        [HttpGet]
        [Route("account-usage-plan")]
        public async Task<IActionResult> GetAccountUsagePlan()
        {
            try
            {
                var accountUsagePlans = await _viewAllOfferedServicePlans.GetAllOfferedServicePlansAsync();
                return Ok(accountUsagePlans);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving account usage plans." });
            }
        }


    }

   


}

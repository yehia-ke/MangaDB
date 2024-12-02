using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.Repository;
using System.ComponentModel.DataAnnotations;

namespace ControllersMangaDB.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerGaafarController : ControllerBase
    {
        private readonly ViewAllOfferedServicePlans _viewAllOfferedServicePlans;
        private readonly GetConsumption _getConsumption;

        public CustomerGaafarController(
            ViewAllOfferedServicePlans viewAllOfferedServicePlans
            , GetConsumption getConsumption

            )
        {
            _viewAllOfferedServicePlans = viewAllOfferedServicePlans;
            _getConsumption = getConsumption;
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

        // 3. View the total usage of the input account on each subscribed plan from a given input date.
        [HttpGet]
        [Route("consumption")]
        public async Task<IActionResult> GetPlanConsumption([FromBody] GetPlanConsumptionRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.plan_name) || request.start_date == DateTime.MinValue
                || request.end_date == DateTime.MinValue)
            {
                return BadRequest(new { message = "Plan name, start date, and end date are required." });
            }

            try
            {
                var planConsumption = await _getConsumption.GetTotalConsumption(request.plan_name, request.start_date, request.end_date);
                return Ok(planConsumption);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving plan consumption." });
            }
        }


    }

    // DTO for Get Plan Consumption Request
    public class GetPlanConsumptionRequest
    {
        [Required]
        public string plan_name { get; set; }
        [Required]
        public DateTime start_date { get; set; }
        [Required]
        public DateTime end_date { get; set; }
    }

   


}

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
        private readonly ViewAllOfferedUnsubscribedPlans _viewAllOfferedUnsubscribedPlans;

        public CustomerGaafarController(
            ViewAllOfferedServicePlans viewAllOfferedServicePlans
            , GetConsumption getConsumption
            , ViewAllOfferedUnsubscribedPlans viewAllOfferedUnsubscribedPlans

            )
        {
            _viewAllOfferedServicePlans = viewAllOfferedServicePlans;
            _getConsumption = getConsumption;
            _viewAllOfferedUnsubscribedPlans = viewAllOfferedUnsubscribedPlans;
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
        public async Task<IActionResult> GetPlanConsumption([FromQuery] string plan_name, [FromQuery] DateTime start_date,[FromQuery] DateTime end_date)
        {
            if (string.IsNullOrWhiteSpace(plan_name) || start_date == DateTime.MinValue
                || end_date == DateTime.MinValue)
            {
                return BadRequest(new { message = "Plan name, start date, and end date are required." });
            }

            try
            {
                var planConsumption = await _getConsumption.GetTotalConsumption(plan_name, start_date, end_date);
                return Ok(planConsumption);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving plan consumption." });
            }
        }

        // 4. View details for all offered unsubscribed service plans.
        [HttpGet]
        [Route("unsubscribed-plans")]
        public async Task<IActionResult> GetUnsubscribedPlans([FromQuery] string mobileNoUnsubscribedPlans)
        {
            if (string.IsNullOrWhiteSpace(mobileNoUnsubscribedPlans))
            {
                return BadRequest(new { message = "Mobile Number required." });
            }

            try
            {
                var unsubscribedPlans = await _viewAllOfferedUnsubscribedPlans.GetAllOfferedUnsubscribedPlans(mobileNoUnsubscribedPlans);
                return Ok(unsubscribedPlans);
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

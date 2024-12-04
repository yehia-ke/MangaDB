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
    public class CustomerHassanController : ControllerBase
    {
        private readonly ViewAllActiveBenefits _viewAllActiveBenefits;
        private readonly ViewUnresolvedTickets _viewUnresolvedTickets;
        private readonly GetConsumption _getConsumption;

        public CustomerHassanController(
            ViewAllActiveBenefits viewAllActiveBenefits,
            ViewUnresolvedTickets viewUnresolvedTickets
            , GetConsumption getConsumption

            )
        {
            _viewAllActiveBenefits = viewAllActiveBenefits;
            _viewUnresolvedTickets = viewUnresolvedTickets;
            _getConsumption = getConsumption;
        }

        // 1. View details for all active benefits.
        [HttpGet]
        [Route("benefits")]
        public async Task<IActionResult> GetActiveBenefits()
        {
            try
            {
                var benefits = await _viewAllActiveBenefits.GetAllActiveBenefitsAsync();
                return Ok(benefits);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving active benefits." });
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
        // 2. View amount of unresolved tickets.
        [HttpGet]
        [Route("unresolved-tickets")]
        public async Task<IActionResult> GetUnresolvedTickets([FromQuery] string NID)
        {
            try
            {
                var unresolvedTickets = await _viewUnresolvedTickets.GetUnresolvedTickets(NID);
                return Ok(unresolvedTickets);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving amount of unresolved tickets." });
            }
        }
    }
}

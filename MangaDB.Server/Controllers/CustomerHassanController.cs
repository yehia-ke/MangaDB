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
        private readonly ViewHighestVoucher _viewHighestVoucher;
        private readonly RemainingPlanAmount _viewRemainingPlanAmount;
        private readonly ViewTopPayments _viewTopPayments;

        public CustomerHassanController(
            ViewAllActiveBenefits viewAllActiveBenefits,
            ViewUnresolvedTickets viewUnresolvedTickets,
            ViewHighestVoucher viewHighestVoucher,
            RemainingPlanAmount viewRemainingPlanAmount,
            ViewTopPayments viewTopPayments

            )
        {
            _viewAllActiveBenefits = viewAllActiveBenefits;
            _viewUnresolvedTickets = viewUnresolvedTickets;
            _viewHighestVoucher = viewHighestVoucher;
            _viewRemainingPlanAmount = viewRemainingPlanAmount;
            _viewTopPayments = viewTopPayments;
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

        // 3. View highest voucher.
        [HttpGet]
        [Route("highest-voucher")]
        public async Task<IActionResult> GetHighestVoucher([FromQuery] string mobileNo)
        {
            try
            {
                var highestVoucher = await _viewHighestVoucher.GetHighestVoucher(mobileNo);
                return Ok(highestVoucher);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving your highest voucher." });
            }
        }

        // 4. View remaining plan amount.
        [HttpGet]
        [Route("remaining-amount")]
        public async Task<IActionResult> GetRemainingPlanAmount([FromQuery] string mobileNo, [FromQuery] string plan__name)
        {
            if (string.IsNullOrWhiteSpace(plan__name))
            {
                return BadRequest(new { message = "Plan name is required." });
            }

            try
            {
                var remainingPlanAmount = await _viewRemainingPlanAmount.GetRemainingPlanAmount(mobileNo, plan__name);
                return Ok(remainingPlanAmount);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving remaining plan amount." });
            }
        }
        // 3. View top payments.
        [HttpGet]
        [Route("top-payments")]
        public async Task<IActionResult> GetTopPayments([FromQuery] string mobileNo)
        {
            try
            {
                var topPayment = await _viewTopPayments.GetTopPayments(mobileNo);
                return Ok(topPayment);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving your top payments." });
            }
        }
    }
}

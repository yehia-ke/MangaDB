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
        private readonly ViewSubscribedPlans5Months _viewSubscribedPlans5Months;
        private readonly RenewSubscription _renewSubscription;
       
        public CustomerHamedController(
            ViewAllShops viewAllShops,
            ViewSubscribedPlans5Months viewSubscribedPlans5Months,
            RenewSubscription renewSubscription
        )
        {
            _viewAllShops = viewAllShops;
            _viewSubscribedPlans5Months = viewSubscribedPlans5Months;
            _renewSubscription = renewSubscription;
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

        [HttpGet]
        [Route("subscribed-plans-5-months")]
        public async Task<IActionResult> GetSubscribedPlans5MonthsAsync([FromQuery] string mobileNo)
        {
            try
            {
                var subscribedPlans5Months = await _viewSubscribedPlans5Months.GetAllSubscribedPlans5MonthsAsync(mobileNo);
                return Ok(subscribedPlans5Months);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving the subscribed plans in the past 5 months." });
            }
        }

        [HttpPost]
        [Route("renew-subscription")]
        public async Task<IActionResult> RenewSubscription([FromBody] RenewSubscriptionRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.MobileNo) || request.Amount < 0 || string.IsNullOrWhiteSpace(request.PaymentMethod) || request.PlanId <= 0)
            {
                return BadRequest(new { message = "Mobile number, payment methos, valid amount, and valid plan ID are required." });
            }

            try
            {
                await _renewSubscription.RenewSubscriptionAsync(request.MobileNo, request.Amount, request.PaymentMethod, request.PlanId);
                return Ok(new { message = "Subscription renewed successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while renewing subscription." });
            }
        }
    }
    public class RenewSubscriptionRequest
    {
        public string MobileNo { get; set; }
        public float Amount { get; set; }
        public string PaymentMethod { get; set; }
        public int PlanId { get; set; }
    }
}

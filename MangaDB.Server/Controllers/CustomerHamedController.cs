﻿using Microsoft.AspNetCore.Http;
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
        private readonly PaymentWalletCashback _paymentWalletCashback;
        private readonly PaymentWalletCashback2 _paymentWalletCashback2;
        private readonly RechargeBalance _rechargeBalance;
        private readonly RedeemVoucher _redeemVoucher;

        public CustomerHamedController(
            ViewAllShops viewAllShops,
            ViewSubscribedPlans5Months viewSubscribedPlans5Months,
            RenewSubscription renewSubscription,
            PaymentWalletCashback paymentWalletCashback,
            PaymentWalletCashback2 paymentWalletCashback2,
            RechargeBalance rechargeBalance,
            RedeemVoucher redeemVoucher
        )
        {
            _viewAllShops = viewAllShops;
            _viewSubscribedPlans5Months = viewSubscribedPlans5Months;
            _renewSubscription = renewSubscription;
            _paymentWalletCashback = paymentWalletCashback;
            _paymentWalletCashback2 = paymentWalletCashback2;
            _rechargeBalance = rechargeBalance;
            _redeemVoucher = redeemVoucher;
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
        public async Task<IActionResult> RenewSubscription([FromQuery] string MobileNo, [FromQuery] float Amount, [FromQuery] string PaymentMethod, [FromQuery] int PlanId)
        {

            if (string.IsNullOrWhiteSpace(MobileNo) || Amount < 0 || string.IsNullOrWhiteSpace(PaymentMethod) || PlanId <= 0)
            {
                return BadRequest(new { message = "Mobile number, payment method, valid amount, and valid plan ID are required." });
            }

            try
            {
                await _renewSubscription.RenewSubscriptionAsync(MobileNo, Amount, PaymentMethod, PlanId);
                return Ok(new { message = "Subscription renewed successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while renewing subscription." });
            }
        }

        [HttpPost]
        [Route("payment-wallet-cashback")]
        public async Task<IActionResult> PaymentWalletCashback([FromQuery] string MobileNo, [FromQuery] int PaymentID, [FromQuery] int BenefitID)
        {

            if (string.IsNullOrWhiteSpace(MobileNo) || PaymentID <= 0 || BenefitID <= 0)
            {
                return BadRequest(new { message = "Mobile number, valid payment ID, and valid benefit ID are required." });
            }

            try
            {
                await _paymentWalletCashback.PaymentWalletCashbackAsync(MobileNo, PaymentID, BenefitID);
                return Ok(new { message = "Wallet updated successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while updating wallet." });
            }
        }

        [HttpGet]
        [Route("payment-wallet-cashback-2")]
        public async Task<IActionResult> PaymentWalletCashback2([FromQuery] string MobileNo, [FromQuery] int PaymentID, [FromQuery] int BenefitID)
        {

            if (string.IsNullOrWhiteSpace(MobileNo) || PaymentID <= 0 || BenefitID <= 0)
            {
                return BadRequest(new { message = "Mobile number, valid payment ID, and valid benefit ID are required." });
            }

            try
            {
                var paymentWalletCashback2 = await _paymentWalletCashback2.PaymentWalletCashback2Async(MobileNo, PaymentID, BenefitID);
                return Ok(paymentWalletCashback2);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while updating wallet." });
            }
        }

        [HttpPost]
        [Route("recharge-balance")]
        public async Task<IActionResult> RechargeBalance([FromQuery] string MobileNo, [FromQuery] float Amount, [FromQuery] string PaymentMethod)
        {

            if (string.IsNullOrWhiteSpace(MobileNo) || Amount < 0 || string.IsNullOrWhiteSpace(PaymentMethod))
            {
                return BadRequest(new { message = "Mobile number, amount, and payment method are required." });
            }

            try
            {
                await _rechargeBalance.RechargeBalanceAsync(MobileNo, Amount, PaymentMethod);
                return Ok(new { message = "Balance recharged successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while recharging balance." });
            }
        }
        [HttpPost]
        [Route("redeem-voucher")]
        public async Task<IActionResult> RedeemVoucher([FromQuery] string MobileNo, [FromQuery] int VoucherID)
        {
            // Input validation
            if (string.IsNullOrWhiteSpace(MobileNo) || VoucherID <= 0)
            {
                return BadRequest(new { message = "Mobile number and voucher ID are required." });
            }

            try
            {
                // Call RedeemVoucherAsync to redeem the voucher and capture the message
                string message = await _redeemVoucher.RedeemVoucherAsync(MobileNo, VoucherID);

                // Log the message for debugging purposes
                Console.WriteLine($"Received Message: {message}");

                // Check if the message indicates success or failure
                if (message=="")
                {
                    return Ok(new { message = "Voucher Redeemed Successfully!"});
                }
                else if (message.Contains("no enough points to redeem voucher", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(new { message = "Not enough points to redeem voucher!" });
                }

                // Return a generic error if the message is unexpected
                return StatusCode(500, new { message = "An error occurred while redeeming the voucher." });
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions that occur
                Console.Error.WriteLine($"Exception: {ex.Message}");
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
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
    public class PaymentWalletCashbackRequest
    {
        public string MobileNo { get; set; }
        public int PaymentID { get; set; }
        public int BenefitID { get; set; }
    }
    public class PaymentWalletCashback2Request
    {
        public string MobileNo { get; set; }
        public int PaymentID { get; set; }
        public int BenefitID { get; set; }
    }
    public class RechargeBalanceRequest
    {
        public string MobileNo { get; set; }
        public float Amount { get; set; }
        public string PaymentMethod { get; set; }
    }
    public class RedeemVoucherRequest
    {
        public string MobileNo { get; set; }
        public float VoucherID { get; set; }
    }
}

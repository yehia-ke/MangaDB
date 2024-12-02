using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Repository.Repository;
using YourNamespace;

namespace ControllersMangaDB.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ViewCustomerProfilesRepository _customerProfilesRepository;
        private readonly PhysicalStoresWithVouchersRepository _physicalStoresRepository;
        private readonly ResolvedTicketsRepository _resolvedTicketsRepository;
        private readonly AccountsWithPlansRepository _accountsWithPlansRepository;
        private readonly AccountsSubscribedToPlanRepository _accountsSubscribedToPlanRepository;
        private readonly TotalUsageRepository _totalUsageRepository;
        private readonly RemoveBenefitsRepository _removeBenefitsRepository;
        private readonly SMSOffersRepository _smsOffersRepository;
        private readonly GetCustomersWallets _getCustomersWalletsRepository;
        private readonly GetEshopVouchers _gfetEshopVouchers;
        private readonly GetAccountPayments _getAccountPayments;
        private readonly CashbackRepository _cashbackRepository;
        private readonly GetAccountPaymentPoints _getAccountPaymentPoints;
        private readonly CashbackAmountRepository _cashbackReAmountpository;

        public AdminController(
            ViewCustomerProfilesRepository customerProfilesRepository,
            PhysicalStoresWithVouchersRepository physicalStoresRepository,
            ResolvedTicketsRepository resolvedTicketsRepository,
            AccountsWithPlansRepository accountsWithPlansRepository,
            AccountsSubscribedToPlanRepository accountsSubscribedToPlanRepository,
            TotalUsageRepository totalUsageRepository,
            RemoveBenefitsRepository removeBenefitsRepository,
            SMSOffersRepository smsOffersRepository,
            GetCustomersWallets getCustomersWalletsRepository,
            GetEshopVouchers eshopVouchersRepository,
            GetAccountPayments getAccountPayments,
            CashbackRepository cashbackRepository,
            GetAccountPaymentPoints getAccountPaymentPoints,
            CashbackAmountRepository cashbackReAmountpository)
        {
            _customerProfilesRepository = customerProfilesRepository;
            _physicalStoresRepository = physicalStoresRepository;
            _resolvedTicketsRepository = resolvedTicketsRepository;
            _accountsWithPlansRepository = accountsWithPlansRepository;
            _accountsSubscribedToPlanRepository = accountsSubscribedToPlanRepository;
            _totalUsageRepository = totalUsageRepository;
            _removeBenefitsRepository = removeBenefitsRepository;
            _smsOffersRepository = smsOffersRepository;
            _getCustomersWalletsRepository = getCustomersWalletsRepository;
            _gfetEshopVouchers = eshopVouchersRepository;
            _getAccountPayments = getAccountPayments;
            _cashbackRepository = cashbackRepository;
            _getAccountPaymentPoints = getAccountPaymentPoints;
            _cashbackReAmountpository = cashbackReAmountpository;
        }

        // 2. View details for all customer profiles along with their active accounts.
        [HttpGet]
        [Route("customer-profiles")]
        public async Task<IActionResult> GetCustomerProfiles()
        {
            try
            {
                var profiles = await _customerProfilesRepository.GetAllCustomerProfilesAsync();
                return Ok(profiles);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving customer profiles." });
            }
        }

        // 3. View the list of all physical stores along with their redeemed voucher’s ids and values.
        [HttpGet]
        [Route("physical-stores/vouchers")]
        public async Task<IActionResult> GetPhysicalStoresWithVouchers()
        {
            try
            {
                var stores = await _physicalStoresRepository.GetPhysicalStoresWithVouchersAsync();
                return Ok(stores);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving physical stores and vouchers." });
            }
        }

        // 4. View details for all resolved tickets.
        [HttpGet]
        [Route("resolved-tickets")]
        public async Task<IActionResult> GetResolvedTickets()
        {
            try
            {
                var tickets = await _resolvedTicketsRepository.GetResolvedTicketsAsync();
                return Ok(tickets);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving resolved tickets." });
            }
        }

        // 5. View all customers’ accounts along with their subscribed service plans.
        [HttpGet]
        [Route("accounts/plans")]
        public async Task<IActionResult> GetAccountsWithPlans()
        {
            try
            {
                var accounts = await _accountsWithPlansRepository.GetAccountsWithPlansAsync();
                return Ok(accounts);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving accounts with plans." });
            }
        }

        // 6. List all customer accounts subscribed to the input plan id on a certain input date.
        [HttpGet]
        [Route("accounts/subscribed")]
        public async Task<IActionResult> GetAccountsSubscribedToPlan([FromQuery] int planId, [FromQuery] DateTime date)
        {
            if (planId <= 0)
            {
                return BadRequest(new { message = "Invalid plan ID." });
            }

            try
            {
                var accounts = await _accountsSubscribedToPlanRepository.GetAccountsSubscribedToPlanAsync(planId, date);
                return Ok(accounts);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving subscribed accounts." });
            }
        }

        // 7. Show the total usage of the input account on each subscribed plan from a given input date.
        [HttpGet]
        [Route("accounts/usage")]
        public async Task<IActionResult> GetTotalUsage([FromQuery] string mobileNo, [FromQuery] DateTime startDate)
        {
            if (string.IsNullOrWhiteSpace(mobileNo))
            {
                return BadRequest(new { message = "Mobile number is required." });
            }

            try
            {
                var usageList = await _totalUsageRepository.GetTotalUsageAsync(mobileNo, startDate);
                return Ok(usageList);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving total usage." });
            }
        }

        // 8. Remove all benefits offered to the input account for a certain input plan ID.
        [HttpPost]
        [Route("benefits/remove")]
        public async Task<IActionResult> RemoveBenefits([FromBody] RemoveBenefitsRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.MobileNo) || request.PlanId <= 0)
            {
                return BadRequest(new { message = "Mobile number and valid plan ID are required." });
            }

            try
            {
                await _removeBenefitsRepository.RemoveBenefitsAsync(request.MobileNo, request.PlanId);
                return Ok(new { message = "Benefits removed successfully." });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while removing benefits." });
            }
        }

        // 9. List all SMS offers for a certain input account.
        [HttpGet]
        [Route("accounts/sms-offers")]
        public async Task<IActionResult> GetSMSOffers([FromQuery] string mobileNo)
        {
            if (string.IsNullOrWhiteSpace(mobileNo))
            {
                return BadRequest(new { message = "Mobile number is required." });
            }

            try
            {
                var offers = await _smsOffersRepository.GetSMSOffersAsync(mobileNo);
                return Ok(offers);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving SMS offers." });
            }
        }

        // 1. View details of all wallets along with their customer names
        [HttpGet]
        [Route("wallets")]
        public async Task<IActionResult> GetAllWalletsWithCustomerNames()
        {
            try
            {
                // Fetch wallet and customer details using the repository method
                var wallets = await _getCustomersWalletsRepository.GetAllWalletsAsync();
                return Ok(wallets); // Return the data as JSON
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving wallet details." });
            }
        }

        //2. View the list of all E-shops along with their redeemed voucher’s ids and values

        [HttpGet]
        [Route("eshops/vouchers")]
        public async Task<IActionResult> GetAllEshopsWithVouchers()
        {
            try
            {
                // Fetch the E-shop vouchers from the repository
                var eshopsWithVouchers = await _gfetEshopVouchers.GetAllEshopsWithVouchersAsync();

                // Return the data as a response
                return Ok(eshopsWithVouchers);
            }
            catch (Exception ex)
            {
                // Handle error and return a server error response
                return StatusCode(500, new { message = "An error occurred while retrieving E-shop voucher details.", error = ex.Message });
            }
        }

        // HTTP GET to retrieve payment transactions with account details
        [HttpGet]
        [Route("payments")]
        public async Task<IActionResult> GetAllPaymentsWithAccounts()
        {
            try
            {
                // Fetch account payment details using the repository method
                var rawPayments = await _getAccountPayments.GetAllAccountPaymentsAsync();

                // Return the raw data directly as JSON
                return Ok(rawPayments);
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "An error occurred while retrieving payment transaction details." });
            }
        }

        //4. View the total number of cashback transactions per each wallet ID.

        [HttpGet("total-transactions")]
        public async Task<IActionResult> GetTotalCashbackTransactionsPerWallet()
        {
            try
            {
                // Call the repository to get the cashback transaction counts
                var result = await _cashbackRepository.GetTotalCashbackTransactionsPerWalletAsync();

                if (result == null || result.Count == 0)
                {
                    return NotFound("No cashback transactions found.");
                }

                // Return the result as a JSON response
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the error (you could use a proper logging mechanism here)
                Console.Error.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("payment-points/{mobileNum}")]
        public async Task<IActionResult> GetAccountPaymentPoints(string mobileNum)
        {
            try
            {
                var (transactionCount, totalPoints) = await _getAccountPaymentPoints.GetAccountPaymentPointsAsync(mobileNum);

                // Convert the tuple to a structured object for serialization
                var response = new
                {
                    TransactionCount = transactionCount,
                    TotalPoints = totalPoints
                };

                return Ok(response); // Return as JSON
            }
            catch (Exception ex)
            {
                // Handle any errors (e.g., log it, return a specific error response)
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("amount/{walletID}/{planID}")]
        public async Task<IActionResult> GetCashbackAmount(int walletID, int planID)
        {
            // Validate input parameters
            if (walletID <= 0 || planID <= 0)
            {
                return BadRequest("Invalid wallet ID or plan ID.");
            }

            try
            {
                // Get the cashback amount from the repository
                int cashbackAmount = await _cashbackReAmountpository.GetCashbackAmountAsync(walletID, planID);

                // Check if cashback amount is found or not
                if (cashbackAmount <= 0)
                {
                    return NotFound("Cashback amount not found.");
                }

                // Return the cashback amount
                return Ok(new { CashbackAmount = cashbackAmount });
            }
            catch (Exception ex)
            {
                // Log and return internal server error
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }



    // DTO for Remove Benefits Request
    public class RemoveBenefitsRequest
    {
        public string MobileNo { get; set; }
        public int PlanId { get; set; }
    }


    // DTO for View details of all wallets along with their customer names.
    public class WalletWithCustomerDto
    {
        public int WalletId { get; set; }
        public decimal Balance { get; set; }
        public string NationalId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    // DTO for Account Payment

}

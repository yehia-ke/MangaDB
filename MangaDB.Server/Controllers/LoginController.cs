using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Repository.Repository;

namespace ControllersMangaDB.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly AuthRepository _authRepository;

        public LoginController(AuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost]
        [Route("validate")]
        public async Task<IActionResult> ValidateLogin([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.MobileNumber) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return BadRequest(new { message = "Mobile number and password are required." });
            }

            try
            {
                var isValid = await _authRepository.ValidateLoginAsync(loginRequest.MobileNumber, loginRequest.Password);

                if (isValid)
                {
                    return Ok(new { message = "Login successful!" });
                }
                else
                {
                    return Unauthorized(new { message = "Invalid mobile number or password." });
                }
            }
            catch
            {
                // If an exception occurs, return a 500 Internal Server Error
                return StatusCode(500, new { message = "An error occurred while processing the login request." });
            }
        }
    }

    // DTO for login request.
    public class LoginRequest
    {
        public string MobileNumber { get; set; }
        public string Password { get; set; }
    }
}

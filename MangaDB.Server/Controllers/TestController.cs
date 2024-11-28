using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

namespace MangaDB.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly SqlConnection _sqlConnection;
        private readonly ILogger<TestController> _logger;

        // Constructor injection for SqlConnection and ILogger
        public TestController(SqlConnection sqlConnection, ILogger<TestController> logger)
        {
            _sqlConnection = sqlConnection;
            _logger = logger;
        }

        [HttpGet("test-connection")]
        public IActionResult TestConnection()
        {
            try
            {
                // Open the connection to test if it's working
                _sqlConnection.Open();

                // Return a successful message if the connection is established
                return Ok(new { message = "Connection to SQL Server is successful!" });
            }
            catch (Exception ex)
            {
                // Log the error details for debugging
                _logger.LogError($"Error connecting to SQL Server: {ex.Message}");

                // Return an error message with details if the connection fails
                return StatusCode(500, new { message = "Error connecting to SQL Server", details = ex.Message });
            }
            finally
            {
                // Close the connection after the test (you can skip closing manually as connection pooling handles it)
                if (_sqlConnection.State == System.Data.ConnectionState.Open)
                {
                    _sqlConnection.Close();
                }
            }
        }
    }
}

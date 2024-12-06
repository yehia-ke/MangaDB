using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RedeemVoucher
    {
        private readonly string _connectionString;

        public RedeemVoucher(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }
        public async Task<string> RedeemVoucherAsync(string mobileNo, int voucherID)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                string message = string.Empty;

                // Subscribe to InfoMessage to capture PRINT messages from the stored procedure
                connection.InfoMessage += (sender, args) =>
                {
                    foreach (SqlError error in args.Errors)
                    {
                        message += error.Message + "\n"; // Capture the PRINT message
                        Console.WriteLine($"Captured Message: {error.Message}"); // Log for debugging
                    }
                };

                await connection.OpenAsync();

                var command = new SqlCommand("Redeem_voucher_points", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };

                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@voucher_id", voucherID);

                await command.ExecuteNonQueryAsync();

                // Return the captured message
                return message; // This will be either the success or failure message
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error: {ex.Message}");
                throw;
            }
        }
    }
}

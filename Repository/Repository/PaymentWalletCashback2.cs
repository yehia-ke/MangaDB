using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class PaymentWalletCashback2
    {
        private readonly string _connectionString;

        public PaymentWalletCashback2(string connectionString) 
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task PaymentWalletCashback2Async(string mobileNo, int paymentID, int benefitID)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("Payment_wallet_cashback", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@payment_id", paymentID);
                command.Parameters.AddWithValue("@benefit_id", benefitID);

                await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while updating wallet: {ex.Message}");
                throw;
            }
        }
    }
}

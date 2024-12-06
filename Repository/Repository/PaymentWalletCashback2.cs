using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.CompilerServices;
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

        public async Task<decimal> PaymentWalletCashback2Async(string mobileNo, int paymentID, int benefitID)
        {
            decimal cashbackAmount;
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                string amountQuery = @"
                    SELECT amount
                    FROM Payment
                    WHERE paymentID = @payment_id AND status = 'successful'";

                var executecommand = new SqlCommand("Payment_wallet_cashback", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                executecommand.Parameters.AddWithValue("@mobile_num", mobileNo);
                executecommand.Parameters.AddWithValue("@payment_id", paymentID);
                executecommand.Parameters.AddWithValue("@benefit_id", benefitID);

                await executecommand.ExecuteNonQueryAsync();

                SqlCommand command = new SqlCommand(amountQuery, connection);
                command.Parameters.AddWithValue("@payment_id", paymentID);

                var amount = await command.ExecuteScalarAsync();
                if (amount == null)
                {
                    throw new Exception("Payment not found or payment is not successfull");
                }

                cashbackAmount = 0.1m * (decimal)amount;
            } catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving shops: {ex.Message}");
                throw;
            }
            return cashbackAmount;
        }
    }
}

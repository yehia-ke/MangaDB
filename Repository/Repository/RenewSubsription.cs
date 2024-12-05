using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RenewSubscription
    {
        private readonly string _connectionString;

        public RenewSubscription(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task RenewSubscriptionAsync(string mobileNo, float amount, string paymentMethod, int planId)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("Initiate_plan_payment", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@amount", amount);
                command.Parameters.AddWithValue("@payment_method", paymentMethod);
                command.Parameters.AddWithValue("@plan_id", planId);

                await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while renewing subscription: {ex.Message}");
                throw;
            }
        }
    }
}

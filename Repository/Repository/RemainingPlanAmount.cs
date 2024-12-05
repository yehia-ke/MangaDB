using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RemainingPlanAmount
    {
        private readonly string _connectionString;

        public RemainingPlanAmount(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<object> GetRemainingPlanAmount(string mobileNo, string planName)
        {
            var remainingAmounts = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT dbo.Remaining_plan_amount(@mobile_num, @plan_name) AS RemainingAmount",connection);

                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@plan_name", planName);

                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var remainingAmount = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        remainingAmount[reader.GetName(i)] = reader.GetValue(i);
                    }
                    remainingAmounts.Add(remainingAmount);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving remaining plan amount: {ex.Message}");
                throw;
            }

            return remainingAmounts;
        }
    }
}

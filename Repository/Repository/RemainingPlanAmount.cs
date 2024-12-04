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

        public async Task<List<Dictionary<string, object>>> GetRemainingPlanAmount(string mobileNo, string plan_name)
        {
            var remainingAmounts = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var commandText = "SELECT dbo.Remaining_plan_amount(@mobile_num, @plan_name)";
                using var command = new SqlCommand(commandText, connection);
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@plan_name", plan_name);

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

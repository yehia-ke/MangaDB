using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ExtraPlanAmount
    {
        private readonly string _connectionString;

        public ExtraPlanAmount(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<object> GetExtraPlanAmount(string mobileNo, string planName)
        {
            var extraAmounts = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT dbo.Extra_plan_amount(@mobile_num, @plan_name) AS extraAmount", connection);

                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@plan_name", planName);

                using var reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var extraAmount = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        extraAmount[reader.GetName(i)] = reader.GetValue(i);
                    }
                    extraAmounts.Add(extraAmount);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving extra plan amount: {ex.Message}");
                throw;
            }

            return extraAmounts;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class TotalUsageRepository
    {
        private readonly string _connectionString;

        public TotalUsageRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetTotalUsageAsync(string mobileNo, DateTime startDate)
        {
            var usageList = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var commandText = "SELECT * FROM dbo.Account_Usage_Plan(@mobile_num, @start_date)";
                using var command = new SqlCommand(commandText, connection);
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@start_date", startDate);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var usage = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        usage[reader.GetName(i)] = reader.GetValue(i);
                    }
                    usageList.Add(usage);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving total usage: {ex.Message}");
                throw;
            }

            return usageList;
        }
    }
}

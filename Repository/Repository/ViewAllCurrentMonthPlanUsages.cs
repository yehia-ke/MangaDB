using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewAllCurrentMonthPlanUsages
    {
        private readonly string _connectionString;

        public ViewAllCurrentMonthPlanUsages(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllCurrentMonthPlanUsages(string mobileNo)
        {
            var currentMonthPlanUsages = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM Usage_Plan_CurrentMonth(@mobile_num)", connection);

                command.Parameters.AddWithValue("@mobile_num", mobileNo);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var currentMonthPlanUsage = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        currentMonthPlanUsage[reader.GetName(i)] = reader.GetValue(i);
                    }
                    currentMonthPlanUsages.Add(currentMonthPlanUsage);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving all current month plan usages: {ex.Message}");
                throw;
            }

            return currentMonthPlanUsages;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class GetConsumption
    {
        private readonly string _connectionString;

        public GetConsumption(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetTotalConsumption(string plan_name, DateTime start_date, DateTime end_date)
        {
            var consumptions = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM dbo.Consumption(@Plan_name, @start_date, @end_date)", connection);
                
                command.Parameters.AddWithValue("@Plan_name", plan_name);
                command.Parameters.AddWithValue("@start_date", start_date);
                command.Parameters.AddWithValue("@end_date", end_date);


                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var consumption = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        consumption[reader.GetName(i)] = reader.GetValue(i);
                    }
                    consumptions.Add(consumption);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving total plan consumption: {ex.Message}");
                throw;
            }

            return consumptions;
        }
    }
}

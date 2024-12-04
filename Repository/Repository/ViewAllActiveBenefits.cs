using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewAllActiveBenefits
    {
        private readonly string _connectionString;

        public ViewAllActiveBenefits (string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllActiveBenefitsAsync()
        {
            var benefits = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM allBenefits ", connection);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var benefit = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        benefit[reader.GetName(i)] = reader.GetValue(i);
                    }
                    benefits.Add(benefit);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving active benefits: {ex.Message}");
                throw;
            }

            return benefits;
        }
    }
}

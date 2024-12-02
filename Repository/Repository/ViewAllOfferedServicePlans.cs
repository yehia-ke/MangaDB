using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewAllOfferedServicePlans
    {
        private readonly string _connectionString;

        public ViewAllOfferedServicePlans(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllOfferedServicePlansAsync()
        {
            var servicePlans = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM allServicePlans", connection);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var servicePlan = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        servicePlan[reader.GetName(i)] = reader.GetValue(i);
                    }
                    servicePlans.Add(servicePlan);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving offered service plans: {ex.Message}");
                throw;
            }

            return servicePlans;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewAllOfferedUnsubscribedPlans
    {
        private readonly string _connectionString;

        public ViewAllOfferedUnsubscribedPlans(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllOfferedUnsubscribedPlans(string mobileNo)
        {
            var unsubscribedPlans = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand($"EXEC Unsubscribed_Plans @mobile_num = '{mobileNo}'", connection);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var unsubscribedPlan = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        unsubscribedPlan[reader.GetName(i)] = reader.GetValue(i);
                    }
                    unsubscribedPlans.Add(unsubscribedPlan);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving all offered unsubscribed plans: {ex.Message}");
                throw;
            }

            return unsubscribedPlans;
        }
    }
}

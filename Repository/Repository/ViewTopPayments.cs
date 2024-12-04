using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewTopPayments
    {
        private readonly string _connectionString;

        public ViewTopPayments(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetTopPayments(string mobileNo)
        {
            var topPayments = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand($"EXEC Top_Successful_Payments @mobile_num = '{mobileNo}'", connection);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var topPayment = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        topPayment[reader.GetName(i)] = reader.GetValue(i);
                    }
                    topPayments.Add(topPayment);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving all offered unsubscribed plans: {ex.Message}");
                throw;
            }

            return topPayments;
        }
    }
}

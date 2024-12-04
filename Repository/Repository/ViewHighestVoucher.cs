using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewHighestVoucher
    {
        private readonly string _connectionString;

        public ViewHighestVoucher(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetHighestVoucher(string mobileNo)
        {
            var highestVouchers = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand($"EXEC Account_Highest_Voucher @mobile_num = '{mobileNo}'", connection);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var highestVoucher = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        highestVoucher[reader.GetName(i)] = reader.GetValue(i);
                    }
                    highestVouchers.Add(highestVoucher);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving your highest voucher: {ex.Message}");
                throw;
            }

            return highestVouchers;
        }
    }
}

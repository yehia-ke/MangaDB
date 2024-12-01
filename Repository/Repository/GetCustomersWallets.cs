using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Repository.Repository
{
    public class GetCustomersWallets
    {
        private readonly string _connectionString;

        public GetCustomersWallets(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllWalletsAsync()
        {
            try
            {
                // Establish a connection
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync().ConfigureAwait(false);

                // Define the SQL query to fetch wallet and customer details from the view
                using var command = new SqlCommand("SELECT * FROM CustomerWallet", connection);

                // Execute the query and read the data
                using var reader = await command.ExecuteReaderAsync().ConfigureAwait(false);

                var result = new List<Dictionary<string, object>>();

                while (await reader.ReadAsync().ConfigureAwait(false))
                {
                    var row = new Dictionary<string, object>();

                    // Add each column value to the dictionary (key is column name, value is column value)
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        row[reader.GetName(i)] = reader.GetValue(i);
                    }

                    result.Add(row);
                }

                return result;
            }
            catch (Exception ex)
            {
                // Log the exception (logging implementation not included)
                Console.Error.WriteLine($"An error occurred while fetching wallets: {ex.Message}");
                throw; // Rethrow the exception for higher-level handling
            }
        }
    }
}

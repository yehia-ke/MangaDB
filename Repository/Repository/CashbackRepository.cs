using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace YourNamespace
{
    public class CashbackRepository
    {
        private readonly string _connectionString;

        // Constructor to initialize the connection string
        public CashbackRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        // Define a class to represent the result with wallet ID and the count of cashback transactions
        public class CashbackTransactionInfo
        {
            public int WalletID { get; set; }
            public int TotalCashbackTransactions { get; set; }
        }

        // Method to retrieve the total number of cashback transactions per wallet (No input parameter)
        public async Task<List<CashbackTransactionInfo>> GetTotalCashbackTransactionsPerWalletAsync()
        {
            var result = new List<CashbackTransactionInfo>();

            try
            {
                // Establish a connection to the database
                using (var connection = new SqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    // Define the SQL command to use the Num_of_cashback view (no input)
                    var command = new SqlCommand("SELECT * FROM dbo.Num_of_cashback", connection);

                    // Execute the query and read the results
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        // Read each row from the result set
                        while (await reader.ReadAsync())
                        {
                            // Get the walletID and total cashback transactions count
                            int walletID = reader.GetInt32(reader.GetOrdinal("walletID"));
                            int totalCashbackTransactions = reader.GetInt32(reader.GetOrdinal("count of transactions"));

                            // Add the result as a new CashbackTransactionInfo object
                            result.Add(new CashbackTransactionInfo
                            {
                                WalletID = walletID,
                                TotalCashbackTransactions = totalCashbackTransactions
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception (simple console error for now)
                Console.Error.WriteLine($"Error: {ex.Message}");
                throw; // Re-throw the exception for higher-level handling
            }

            // Return the list of total cashback transactions per wallet
            return result;
        }
    }
}

using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

public class CashbackAmountRepository
{
    private readonly string _connectionString;

    // Constructor to initialize connection string
    public CashbackAmountRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    // Method to fetch cashback amount based on wallet ID and plan ID
    public async Task<int> GetCashbackAmountAsync(int walletID, int planID)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            await connection.OpenAsync();

            // SQL query to call the Wallet_Cashback_Amount function
            using (var command = new SqlCommand("SELECT dbo.Wallet_Cashback_Amount(@walletID, @planID)", connection))
            {
                // Add parameters to prevent SQL injection
                command.Parameters.AddWithValue("@walletID", walletID);
                command.Parameters.AddWithValue("@planID", planID);

                // Execute the query and handle DBNull
                var result = await command.ExecuteScalarAsync();

                // Check if the result is DBNull or null, and handle it accordingly
                if (result == DBNull.Value || result == null)
                {
                    throw new InvalidOperationException("Cashback amount not found for the given wallet ID and plan ID.");
                }

                // Return the result as an integer
                return Convert.ToInt32(result);
            }
        }
    }
}

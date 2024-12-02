using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

public class GetAccountPaymentPoints
{
    private readonly string _connectionString;

    public GetAccountPaymentPoints(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    public async Task<(int TransactionCount, decimal TotalPoints)> GetAccountPaymentPointsAsync(string mobileNum)
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync().ConfigureAwait(false);

            // Execute the stored procedure
            using var command = new SqlCommand($"EXEC Account_Payment_Points @mobile_num = '{mobileNum}'", connection);

            using var reader = await command.ExecuteReaderAsync().ConfigureAwait(false);

            if (await reader.ReadAsync().ConfigureAwait(false))
            {
                // Read the two columns from the result set
                int transactionCount = reader.GetInt32(0); // First column
                decimal totalPoints = reader.GetInt32(1); // Second column

                return (transactionCount, totalPoints);
            }

            // If no rows are returned, return default values
            return (0, 0);
        }
        catch (Exception ex)
        {
            // Log error
            Console.Error.WriteLine($"An error occurred: {ex.Message}");
            throw;
        }
    }
}

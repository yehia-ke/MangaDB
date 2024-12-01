using System.Data.SqlClient;

public class GetAccountPayments
{
    private readonly string _connectionString;

    public GetAccountPayments(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    public async Task<List<Dictionary<string, object>>> GetAllAccountPaymentsAsync()
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            // Define the SQL query to fetch payment transactions with corresponding account details
            using var command = new SqlCommand("SELECT * FROM AccountPayments", connection);

            // Execute the query and read the data
            using var reader = await command.ExecuteReaderAsync();

            var result = new List<Dictionary<string, object>>();

            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object>();
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
            // Handle exception (logging, etc.)
            throw new Exception("An error occurred while fetching account payment details.", ex);
        }
    }
}

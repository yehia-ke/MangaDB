using System.Data.SqlClient;

public class GetEshopVouchers
{
    private readonly string _connectionString;

    public GetEshopVouchers(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    public async Task<List<Dictionary<string, object>>> GetAllEshopsWithVouchersAsync()
    {
        try
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync().ConfigureAwait(false);

            using var command = new SqlCommand("SELECT * FROM E_shopVouchers", connection);
            using var reader = await command.ExecuteReaderAsync().ConfigureAwait(false);

            var result = new List<Dictionary<string, object>>();

            while (await reader.ReadAsync().ConfigureAwait(false))
            {
                var row = new Dictionary<string, object>();

                // Add each column value to the dictionary
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
            // Log error
            Console.Error.WriteLine($"An error occurred: {ex.Message}");
            throw;
        }
    }
}

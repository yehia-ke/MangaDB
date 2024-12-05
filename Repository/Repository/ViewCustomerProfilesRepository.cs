using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewCustomerProfilesRepository
    {
        private readonly string _connectionString;

        public ViewCustomerProfilesRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllCustomerProfilesAsync()
        {
            var profiles = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM allCustomerAccounts", connection);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var profile = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        profile[reader.GetName(i)] = reader.GetValue(i);
                    }
                    profiles.Add(profile);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving customer profiles: {ex.Message}");
                throw;
            }

            return profiles;
        }
    }
}

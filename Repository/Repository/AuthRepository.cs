using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class AuthRepository
    {
        private readonly string _connectionString;

        public AuthRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<bool> ValidateLoginAsync(string mobileNumber, string password)
        {
            try
            {
                // Establish a connection
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                // Define the SQL command to call the scalar-valued function
                var command = new SqlCommand("SELECT dbo.AccountLoginValidation(@mobile_num, @pass)", connection);
                command.Parameters.AddWithValue("@mobile_num", mobileNumber);
                command.Parameters.AddWithValue("@pass", password);

                // Execute the command and fetch the result
                var result = await command.ExecuteScalarAsync();

                // Return true if the result is 1 (indicating successful login)
                return result != null && Convert.ToBoolean(result);
            }
            catch (Exception ex)
            {
                // Log the exception (logging implementation not included)
                Console.Error.WriteLine($"An error occurred during login validation: {ex.Message}");
                throw; // Rethrow the exception for higher-level handling
            }
        }
    }
}

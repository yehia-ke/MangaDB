using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class UpdatePointsRepository
    {
        private readonly string _connectionString;

        // Constructor to initialize the connection string
        public UpdatePointsRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<bool> UpdatePointsAsync(string mobileNumber)
        {
            try
            {
                // Establish a connection to the database
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync().ConfigureAwait(false);

                // Set up the SQL query string with parameterized EXEC statement
                string sql = "EXEC [DBO].Total_Points_Account @mobile_num";

                // Set up the command to execute the SQL query
                using var command = new SqlCommand(sql, connection)
                {
                    CommandType = CommandType.Text // CommandType.Text for raw SQL execution
                };

                // Add the parameter for the stored procedure
                command.Parameters.Add(new SqlParameter("@mobile_num", SqlDbType.Char, 11)
                {
                    Value = mobileNumber // Assign the input parameter to @mobile_num
                });

                // Execute the stored procedure and capture the affected rows
                int rowsAffected = await command.ExecuteNonQueryAsync().ConfigureAwait(false);

                // Return true if rows were affected, false otherwise
                return rowsAffected > 0;
            }
            catch (Exception ex)
            {
                // Log the exception (logging implementation not included)
                Console.Error.WriteLine($"An error occurred while updating points: {ex.Message}");
                throw; // Rethrow the exception for higher-level handling
            }
        }
    }
}

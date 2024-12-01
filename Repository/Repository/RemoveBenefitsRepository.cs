using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RemoveBenefitsRepository
    {
        private readonly string _connectionString;

        public RemoveBenefitsRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task RemoveBenefitsAsync(string mobileNo, int planId)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("Benefits_Account", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@plan_id", planId);

                await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while removing benefits: {ex.Message}");
                throw;
            }
        }
    }
}

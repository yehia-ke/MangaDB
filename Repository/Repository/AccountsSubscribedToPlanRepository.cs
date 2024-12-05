using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class AccountsSubscribedToPlanRepository
    {
        private readonly string _connectionString;

        public AccountsSubscribedToPlanRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAccountsSubscribedToPlanAsync(int planId, DateTime date)
        {
            var accounts = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var commandText = "SELECT * FROM dbo.Account_Plan_date(@sub_date, @plan_id)";
                using var command = new SqlCommand(commandText, connection);
                command.Parameters.AddWithValue("@sub_date", date);
                command.Parameters.AddWithValue("@plan_id", planId);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var account = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        account[reader.GetName(i)] = reader.GetValue(i);
                    }
                    accounts.Add(account);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving accounts subscribed to plan: {ex.Message}");
                throw;
            }

            return accounts;
        }
    }
}

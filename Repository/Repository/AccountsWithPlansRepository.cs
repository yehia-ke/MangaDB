using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class AccountsWithPlansRepository
    {
        private readonly string _connectionString;

        public AccountsWithPlansRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAccountsWithPlansAsync()
        {
            var accounts = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("Account_Plan", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };

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
                Console.Error.WriteLine($"An error occurred while retrieving accounts with plans: {ex.Message}");
                throw;
            }

            return accounts;
        }
    }
}

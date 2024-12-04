using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewUnresolvedTickets
    {
        private readonly string _connectionString;

        public ViewUnresolvedTickets(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetUnresolvedTickets(string NID)
        {
            var unresolvedTickets = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand($"EXEC Ticket_Account_Customer @NID = '{NID}'", connection);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var unresolvedTicket = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        unresolvedTicket[reader.GetName(i)] = reader.GetValue(i);
                    }
                    unresolvedTickets.Add(unresolvedTicket);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving unresolved customer support tickets: {ex.Message}");
                throw;
            }

            return unresolvedTickets;
        }
    }
}

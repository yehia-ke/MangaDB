using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ResolvedTicketsRepository
    {
        private readonly string _connectionString;

        public ResolvedTicketsRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetResolvedTicketsAsync()
        {
            var tickets = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM allResolvedTickets", connection);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var ticket = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        ticket[reader.GetName(i)] = reader.GetValue(i);
                    }
                    tickets.Add(ticket);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving resolved tickets: {ex.Message}");
                throw;
            }

            return tickets;
        }
    }
}

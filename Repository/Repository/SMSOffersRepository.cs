using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class SMSOffersRepository
    {
        private readonly string _connectionString;

        public SMSOffersRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetSMSOffersAsync(string mobileNo)
        {
            var offers = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var commandText = "SELECT * FROM dbo.Account_SMS_Offers(@mobile_num)";
                using var command = new SqlCommand(commandText, connection);
                command.Parameters.AddWithValue("@mobile_num", mobileNo);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var offer = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        offer[reader.GetName(i)] = reader.GetValue(i);
                    }
                    offers.Add(offer);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving SMS offers: {ex.Message}");
                throw;
            }

            return offers;
        }
    }
}

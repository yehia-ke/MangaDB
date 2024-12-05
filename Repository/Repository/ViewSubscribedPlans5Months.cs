using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewSubscribedPlans5Months
    {
        private readonly string _connectionString;

        public ViewSubscribedPlans5Months(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllSubscribedPlans5MonthsAsync(string mobileNo)
        {
            var subscribedPlans5MonthsList = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var commandText = "SELECT * FROM dbo.Subscribed_plans_5_Months(@mobile_num)";
                using var command = new SqlCommand(commandText, connection);
                command.Parameters.AddWithValue("@mobile_num", mobileNo);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var subscribedPlans5Months = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        subscribedPlans5Months[reader.GetName(i)] = reader.GetValue(i);
                    }
                    subscribedPlans5MonthsList.Add(subscribedPlans5Months);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving subscribed plans in the past 5 months: {ex.Message}");
                throw;
            }

            return subscribedPlans5MonthsList;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Numerics;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class ViewAllCashbackTransactions
    {
        private readonly string _connectionString;

        public ViewAllCashbackTransactions(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetAllCashbackTransactions(string mobileNo)
        {
            var cashbackTransactions = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                //Automatically get the national ID of the customer without their input
                var command1 = new SqlCommand("SELECT nationalID FROM customer_account WHERE mobileNo = @mobileNo", connection);
                command1.Parameters.AddWithValue("@mobileNo", mobileNo);

                using var reader1 = await command1.ExecuteReaderAsync();

                string nationalID = "";
                while (await reader1.ReadAsync())
                {
                    nationalID = "" + reader1.GetValue(0);
                }

                reader1.Close();

                var command = new SqlCommand("SELECT * FROM Cashback_Wallet_Customer(@NID)", connection);
                command.Parameters.AddWithValue("@NID", nationalID);

                using var reader = await command.ExecuteReaderAsync();
                
                while (await reader.ReadAsync())
                {
                    var cashbackTransaction = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        /*if(i == 4)
                            cashbackTransaction[reader.GetName(i)] = ((DateTime)reader.GetValue(i)).ToString("yyyy-MM-dd");
                        else
                            cashbackTransaction[reader.GetName(i)] = reader.GetValue(i);*/

                        cashbackTransaction[reader.GetName(i)] = reader.GetValue(i);
                    }
                    cashbackTransactions.Add(cashbackTransaction);
                }
                
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving all cashback transactions: {ex.Message}");
                throw;
            }

            return cashbackTransactions;
        }
    }
}

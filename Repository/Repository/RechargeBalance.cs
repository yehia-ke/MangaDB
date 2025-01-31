﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RechargeBalance
    {
        private readonly string _connectionString;

        public RechargeBalance(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }
        public async Task RechargeBalanceAsync(string mobileNo, float amount, string paymentMethod)
        {
            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("Initiate_balance_payment", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@mobile_num", mobileNo);
                command.Parameters.AddWithValue("@amount", amount);
                command.Parameters.AddWithValue("@payment_method", paymentMethod);

                await command.ExecuteNonQueryAsync();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while recharging balance: {ex.Message}");
                throw;
            }
        }
    }
}

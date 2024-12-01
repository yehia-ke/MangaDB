using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class PhysicalStoresWithVouchersRepository
    {
        private readonly string _connectionString;

        public PhysicalStoresWithVouchersRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        public async Task<List<Dictionary<string, object>>> GetPhysicalStoresWithVouchersAsync()
        {
            var stores = new List<Dictionary<string, object>>();

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                var command = new SqlCommand("SELECT * FROM PhysicalStoreVouchers", connection);

                using var reader = await command.ExecuteReaderAsync();
                while (await reader.ReadAsync())
                {
                    var store = new Dictionary<string, object>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        store[reader.GetName(i)] = reader.GetValue(i);
                    }
                    stores.Add(store);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving physical stores with vouchers: {ex.Message}");
                throw;
            }

            return stores;
        }
    }
}

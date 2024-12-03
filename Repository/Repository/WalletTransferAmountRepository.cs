using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class WalletTransferAmountRepository
    {
        private readonly string _connectionString;

        public WalletTransferAmountRepository(string connectionString)
        {
            _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
        }

        /// <summary>
        /// Gets the average transaction amount for a wallet within a specified date range.
        /// </summary>
        /// <param name="walletID">The wallet ID to query.</param>
        /// <param name="startDate">The start date of the date range.</param>
        /// <param name="endDate">The end date of the date range.</param>
        /// <returns>The average transaction amount, or 0 if no transactions are found.</returns>
        public async Task<int> GetAverageTransactionAmountAsync(int walletID, DateTime startDate, DateTime endDate)
        {
            int averageAmount = 0;

            try
            {
                using var connection = new SqlConnection(_connectionString);
                await connection.OpenAsync();

                using var command = new SqlCommand("SELECT dbo.Wallet_Transfer_Amount(@walletID, @startDate, @endDate)", connection);
                command.Parameters.Add(new SqlParameter("@walletID", SqlDbType.Int) { Value = walletID });
                command.Parameters.Add(new SqlParameter("@startDate", SqlDbType.Date) { Value = startDate });
                command.Parameters.Add(new SqlParameter("@endDate", SqlDbType.Date) { Value = endDate });

                var result = await command.ExecuteScalarAsync();

                if (result != DBNull.Value && result != null)
                {
                    averageAmount = Convert.ToInt32(result);
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"An error occurred while retrieving the average transaction amount: {ex.Message}");
                throw;
            }

            return averageAmount;
        }
    }
}

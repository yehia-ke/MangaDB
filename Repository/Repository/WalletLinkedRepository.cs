using System;
using System.Data;
using System.Data.SqlClient;

public class WalletLinkedRepository
{
    private readonly string _connectionString;

    public WalletLinkedRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public bool IsMobileNumberLinkedToWallet(string mobileNumber)
    {
        bool isLinked = false;

        // Ensure that the mobile number is valid
        if (string.IsNullOrWhiteSpace(mobileNumber) || mobileNumber.Length != 11)
        {
            throw new ArgumentException("Invalid mobile number. It must be 11 characters long.");
        }

        using (var connection = new SqlConnection(_connectionString))
        {
            try
            {
                connection.Open();

                // Use proper parameterized query to prevent SQL injection
                using (var command = new SqlCommand("SELECT dbo.Wallet_MobileNo(@mobile_num)", connection))
                {
                    // Add parameter to the query with the appropriate type
                    command.Parameters.Add(new SqlParameter("@mobile_num", SqlDbType.VarChar, 11)).Value = mobileNumber;

                    // Execute the function and get the result
                    var result = command.ExecuteScalar();

                    // Check the result and assign the return value to isLinked
                    if (result != DBNull.Value)
                    {
                        isLinked = Convert.ToInt32(result) == 1;
                    }
                }
            }
            catch (SqlException sqlEx)
            {
                // Log or handle SQL exceptions
                Console.WriteLine($"SQL Error: {sqlEx.Message}");
                throw new Exception("An error occurred while checking the mobile number linkage.");
            }
            catch (Exception ex)
            {
                // Log or handle general exceptions
                Console.WriteLine($"Error: {ex.Message}");
                throw; // Rethrow the exception
            }
        }

        return isLinked;
    }
}

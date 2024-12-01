using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Repository.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Get the database connection string from configuration.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Register SqlConnection as a transient service.
builder.Services.AddTransient<SqlConnection>(_ => new SqlConnection(connectionString));

// Add CORS policy to allow requests from React frontend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register the AuthRepository as a scoped service.
builder.Services.AddScoped<AuthRepository>(provider => new AuthRepository(connectionString));
builder.Services.AddScoped<ViewCustomerProfilesRepository>(provider => new ViewCustomerProfilesRepository(connectionString));
builder.Services.AddScoped<PhysicalStoresWithVouchersRepository>(provider => new PhysicalStoresWithVouchersRepository(connectionString));
builder.Services.AddScoped<ResolvedTicketsRepository>(provider => new ResolvedTicketsRepository(connectionString));
builder.Services.AddScoped<AccountsWithPlansRepository>(provider => new AccountsWithPlansRepository(connectionString));
builder.Services.AddScoped<AccountsSubscribedToPlanRepository>(provider => new AccountsSubscribedToPlanRepository(connectionString));
builder.Services.AddScoped<TotalUsageRepository>(provider => new TotalUsageRepository(connectionString));
builder.Services.AddScoped<RemoveBenefitsRepository>(provider => new RemoveBenefitsRepository(connectionString));
builder.Services.AddScoped<SMSOffersRepository>(provider => new SMSOffersRepository(connectionString));

var app = builder.Build();

// Middleware for serving static files (for React app).
app.UseDefaultFiles();    // Serve default file like index.html
app.UseStaticFiles();     // Serve static files from the React build output

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigins");  // Apply CORS policy here
app.UseAuthorization();

app.MapControllers();

// Fallback route to serve React app's index.html for client-side routing
app.MapFallbackToFile("/index.html");

app.Run();



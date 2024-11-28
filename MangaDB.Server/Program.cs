using Microsoft.Data.SqlClient;

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
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

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
app.UseCors("AllowSpecificOrigins");
app.UseAuthorization();

app.MapControllers();

// Fallback route to serve React app's index.html for client-side routing
app.MapFallbackToFile("/index.html");

app.Run();

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Register services for controllers (API)
builder.Services.AddControllers();

// Enable CORS (optional if you're serving frontend and backend together)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5210); // or any free port
});

var app = builder.Build();

// Middleware setup
app.UseDefaultFiles(); // Looks for index.html

app.UseHttpsRedirection();
app.UseStaticFiles(); // Serves files from wwwroot

app.UseRouting();

app.UseCors("AllowAll"); // Enable CORS
app.UseAuthorization();

app.MapControllers(); // Maps /api/* routes

// Fallback to index.html for client-side routing
app.MapFallbackToFile("index.html");

app.Run();

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Filter;
using ProjectPRN22_Backend.Hubs;
using ProjectPRN22_Backend.Repositories.Implementations;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Implementations;
using ProjectPRN22_Backend.Services.Interfaces;
using ProjectPRN22_Backend.Services.Utils;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// CORS Policy Name
const string CorsPolicyName = "AllowFrontend";

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicyName, policy =>
        policy.WithOrigins(Environment.GetEnvironmentVariable("ALLOW_CORS")
                ?? builder.Configuration["AllowCORS"])
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
        );
});

// Retrieve JWT Secret Key
var secretKey = Environment.GetEnvironmentVariable("JwtSettings__SecretKey")
                ?? builder.Configuration["JwtSettings:SecretKey"];
var key = Encoding.UTF8.GetBytes(secretKey);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Database
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseNpgsql(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
                       ?? builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Authentication & JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Register Singleton & Scoped Services
builder.Services.AddSingleton<JwtHelper>();
builder.Services.AddHttpClient();
RegisterServices(builder.Services);
RegisterRepositories(builder.Services);
builder.Services.AddScoped<AuthenticateFilter>();
builder.Services.AddScoped<InitData>();

var app = builder.Build();

// Apply Migrations & Seed Data on Startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDBContext>();
    dbContext.Database.Migrate(); // Apply migrations

    var initData = scope.ServiceProvider.GetRequiredService<InitData>();
    await initData.GenData(); // Seed data
}


// Configure Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.UseCors(CorsPolicyName);
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers & Hubs
app.MapControllers();
app.MapHub<GlobalChatHub>("/chatHub");

app.Run();

void RegisterServices(IServiceCollection services)
{
    services.AddScoped<ILoginServices, LoginServices>();
    services.AddScoped<IHistoryServices, HistoryServices>();
    services.AddScoped<IMusicServices, MusicServices>();
    services.AddScoped<IUserServices, UserServices>();
    services.AddScoped<IGlobalChatService, GlobalChatServices>();
}

void RegisterRepositories(IServiceCollection services)
{
    services.AddScoped<IGlobalChatsRepo, GlobalChatsRepo>();
    services.AddScoped<IMusicsRepo, MusicsRepo>();
    services.AddScoped<IHistoriesRepo, HistoriesRepo>();
    services.AddScoped<IUsersRepo, UsersRepo>();
    services.AddScoped<IBackgroundRepo, BackgroundRepo>();
}
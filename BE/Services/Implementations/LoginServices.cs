using Microsoft.Extensions.Configuration;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;
using ProjectPRN22_Backend.Services.Utils;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace ProjectPRN22_Backend.Services.Implementations
{
    public class LoginServices : ILoginServices
    {
        private readonly string GOOGLE_URL_TOKEN = "https://accounts.google.com/o/oauth2/token";
        private readonly string GOOGLE_URL_USER_INFO = "https://www.googleapis.com/oauth2/v1/userinfo";
        private readonly HttpClient _httpClient;
        private readonly IUsersRepo _userRepo;
        private readonly JwtHelper _jwthelper;
        private readonly IConfiguration _configuration;

        public LoginServices(HttpClient httpClient, IUsersRepo usersRepo, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _userRepo = usersRepo;
            _configuration = configuration;
            _jwthelper = new JwtHelper(configuration);
        }

        public async Task<string> Login(string code)
        {
            Users user = await LoginWithGoogle(code);
            return _jwthelper.GenerateToken(user.Id + "");
        }

        private async Task<Users> LoginWithGoogle(string code)
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, GOOGLE_URL_TOKEN);

            string jsonBody = JsonSerializer.Serialize(new
            {
                code = code,
                client_id = Environment.GetEnvironmentVariable("SSOGoogle__ClientId")
                ?? _configuration["SSOGoogle:ClientId"],
                grant_type = "authorization_code",
                client_secret = Environment.GetEnvironmentVariable("SSOGoogle__ClientSecret")
                ?? _configuration["SSOGoogle:ClientSecret"],
                redirect_uri = Environment.GetEnvironmentVariable("SSOGoogle__RedirectUri")
                ?? _configuration["SSOGoogle:RedirectUri"]
            });
            request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                //return StatusCode((int)response.StatusCode, "Error calling external API");
            }

            string responseData = await response.Content.ReadAsStringAsync();
            JsonDocument doc = JsonDocument.Parse(responseData);
            string accessToken = doc.RootElement.GetProperty("access_token").GetString();

            request = new HttpRequestMessage(HttpMethod.Get, GOOGLE_URL_USER_INFO);

            request.Headers.Add("Authorization", $"Bearer {accessToken}");

            response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                //return StatusCode((int)response.StatusCode, "Error calling external API");
            }

            responseData = await response.Content.ReadAsStringAsync();
            doc = JsonDocument.Parse(responseData);

            string email = doc.RootElement.GetProperty("email").GetString();
            Console.WriteLine(doc.RootElement.GetProperty("name").GetString());
            Console.WriteLine(doc.RootElement.ToString());

            Users user = await _userRepo.GetByEmailAsync(email);
            if (user != null)
            {
                return user;
            }
            
            return await _userRepo.AddAsync(new Users {
                Email = email,
                Name = doc.RootElement.GetProperty("name").GetString()
            });
        }
    }
}

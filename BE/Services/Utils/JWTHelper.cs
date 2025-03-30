using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace ProjectPRN22_Backend.Services.Utils
{
    public class JwtHelper
    {
        private readonly string _secretKey;
        private readonly int _tokenExpiry;

        public JwtHelper(IConfiguration configuration)
        {
            _secretKey = Environment.GetEnvironmentVariable("JwtSettings__SecretKey")
                ?? configuration["JwtSettings:SecretKey"];
            _tokenExpiry = int.Parse(Environment.GetEnvironmentVariable("JwtSettings__TokenExpiry")
                ?? configuration["JwtSettings:TokenExpiry"] ?? "1");
        }

        public string GenerateToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, userId),
                //new Claim(ClaimTypes.Role, "User") // Example claim
            }),
                Expires = DateTime.UtcNow.AddHours(_tokenExpiry),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

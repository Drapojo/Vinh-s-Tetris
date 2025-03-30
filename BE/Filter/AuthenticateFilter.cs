using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using ProjectPRN22_Backend.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ProjectPRN22_Backend.Filter
{
    public class AuthenticateFilter : Attribute, IAsyncActionFilter
    {
        private readonly IUserServices _userServices;
        private readonly string secretKey;

        public AuthenticateFilter(IUserServices userServices, IConfiguration configuration)
        {
            _userServices = userServices;
            secretKey = Environment.GetEnvironmentVariable("JwtSettings__SecretKey")
                ?? configuration["JwtSettings:SecretKey"];
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            var authorizationHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                context.Result = new UnauthorizedObjectResult("Missing or invalid token.");
                return;
            }

            var token = authorizationHeader.Split(" ").Last();
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secretKey);

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            SecurityToken validatedToken;
            ClaimsPrincipal principal;
            try
            {
                principal = handler.ValidateToken(token, validationParameters, out validatedToken);
            }
            catch (Exception ex)
            {
                context.Result = new UnauthorizedObjectResult($"Invalid token: {ex.Message}");
                return;
            }

            var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                context.Result = new UnauthorizedObjectResult("Invalid token.");
                return;
            }

            var user = await _userServices.GetUser(int.Parse(userId));
            if (user == null)
            {
                context.Result = new NotFoundObjectResult("User not found.");
                return;
            }

            // Inject the user into the action parameters
            httpContext.Items["CurrentUser"] = user;

            await next();
        }
    }
}

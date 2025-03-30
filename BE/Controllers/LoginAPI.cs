using Microsoft.AspNetCore.Mvc;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Controllers
{
    [ApiController]
    [Route("api/login")]
    public class LoginAPI : ControllerBase
    {
        private readonly ILoginServices _loginServices;

        public LoginAPI(ILoginServices loginServices)
        {
            _loginServices = loginServices;
        }

        [HttpPost()]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Code))
            {
                return BadRequest("Code is required");
            }
            string token = await _loginServices.Login(request.Code);
            return Ok(new { AccessToken = token });
        }
    }

}

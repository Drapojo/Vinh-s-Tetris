using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectPRN22_Backend.Filter;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserAPI : ControllerBase
    {
        private readonly IUserServices _userServices;

        public UserAPI(IUserServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet()]
        [Authorize]
        public async Task<IActionResult> GetAllUsers([FromQuery] QueryParam queryParam)
        {
            ResponsePublics<UserPublic> response = await _userServices.GetAllUsers(queryParam);
            return Ok(response);
        }

        [HttpGet("user")]
        [Authorize]
        [ServiceFilter(typeof(AuthenticateFilter))]
        public IActionResult GetUserDetail()
        {
            var currentUser = HttpContext.Items["CurrentUser"] as Users;
            if (currentUser == null)
                return NotFound("User not found.");
            return Ok(currentUser);
        }

        [HttpPut("user")]
        [Authorize]
        [ServiceFilter(typeof(AuthenticateFilter))]
        public async Task<IActionResult> UpdateUser(UpdateUser updateUser)
        {
            var currentUser = HttpContext.Items["CurrentUser"] as Users;
            if (currentUser == null)
                return NotFound("User not found.");
            currentUser.Name = updateUser.Name.Trim();
            return Ok(await _userServices.UpdateUser(currentUser));
        }
        [HttpGet("user-data")]
        [Authorize]
        [ServiceFilter(typeof(AuthenticateFilter))]
        public async Task<IActionResult> GetData()
        {
            var currentUser = HttpContext.Items["CurrentUser"] as Users;
            if (currentUser == null)
                return NotFound("User not found.");
            return Ok(await _userServices.GetUserData(currentUser.Id));
        }
    }
}

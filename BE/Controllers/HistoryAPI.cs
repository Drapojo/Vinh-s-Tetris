using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjectPRN22_Backend.Filter;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Controllers
{
    [ApiController]
    [Route("api")]
    public class HistoryAPI : ControllerBase
    {
        IHistoryServices _historyServices;
        public HistoryAPI(IHistoryServices historyServices)
        {
            _historyServices = historyServices;
        }

        [HttpGet("histories")]
        [Authorize]
        [ServiceFilter(typeof(AuthenticateFilter))]
        public async Task<IActionResult> GetUserHistory([FromQuery] QueryParam queryParam)
        {
            var currentUser = HttpContext.Items["CurrentUser"] as Users;
            if (currentUser == null)
                return NotFound("User not found.");
            ResponsePublics<HistoryDto> response = await _historyServices.GetHistoryByUserId(currentUser.Id, queryParam);
            return Ok(response);
        }
        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard([FromQuery] QueryParam queryParam)
        {
            ResponsePublics<HistoryDto> response = await _historyServices.GetLeaderboard(queryParam);
            return Ok(response);
        }

        [HttpPost("histories")]
        [Authorize]
        [ServiceFilter(typeof(AuthenticateFilter))]
        public async Task<IActionResult> AddHistory(Histories history)
        {
            var currentUser = HttpContext.Items["CurrentUser"] as Users;
            if (currentUser == null)
                return NotFound("User not found.");
            history.UserId = currentUser.Id;
            Histories response = await _historyServices.AddHistory(history);
            return Ok(response);
        }
    }
}

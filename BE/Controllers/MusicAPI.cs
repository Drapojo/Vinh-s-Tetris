using Microsoft.AspNetCore.Mvc;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Controllers
{
    [ApiController]
    [Route("api/music")]
    public class MusicAPI : ControllerBase
    {
        IMusicServices _musicServices;
        public MusicAPI(IMusicServices musicServices)
        {
            _musicServices = musicServices;
        }
        [HttpGet()]
        public async Task<IActionResult> GetMusics()
        {
            IEnumerable<Musics> musics = await _musicServices.GetAllMusic();
            return Ok(musics);
        }
        [HttpPost()]
        public async Task<IActionResult> AddMusic([FromBody] Musics music)
        {
            Musics musics = await _musicServices.AddMusic(music);
            return Ok(musics);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMusic(int id)
        {
            await _musicServices.DeleteMusic(id);
            return Ok();
        }
    }
}

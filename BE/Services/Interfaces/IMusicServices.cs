using ProjectPRN22_Backend.Models.Entities;

namespace ProjectPRN22_Backend.Services.Interfaces
{
    public interface IMusicServices
    {
        Task<IEnumerable<Musics>> GetAllMusic();
        Task<Musics> AddMusic(Musics music);
        Task DeleteMusic(int id);
    }
}

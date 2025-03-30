using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Services.Implementations
{
    public class MusicServices : IMusicServices
    {
        IMusicsRepo _musicsRepo;
        public MusicServices(IMusicsRepo musicsRepo) {
            _musicsRepo = musicsRepo;
        }
        public async Task<IEnumerable<Musics>> GetAllMusic()
        {
            return await _musicsRepo.GetAllAsync();
        }
    }
}

using ProjectPRN22_Backend.Models.Entities;
using vinhvdqhe180173LAB1.Repositories.Interfaces;

namespace ProjectPRN22_Backend.Repositories.Interfaces
{
    public interface IMusicsRepo : IRepository<Musics>
    {
        Task<Musics?> GetByNameAsync(string name);
    }
}

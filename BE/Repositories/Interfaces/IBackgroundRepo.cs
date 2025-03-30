using ProjectPRN22_Backend.Models.Entities;
using vinhvdqhe180173LAB1.Repositories.Interfaces;

namespace ProjectPRN22_Backend.Repositories.Interfaces
{
    public interface IBackgroundRepo : IRepository<Backgrounds>
    {
        Task<Backgrounds?> GetByNameAsync(string name);
    }
}

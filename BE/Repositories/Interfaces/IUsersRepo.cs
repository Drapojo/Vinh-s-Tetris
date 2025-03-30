using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using vinhvdqhe180173LAB1.Repositories.Interfaces;

namespace ProjectPRN22_Backend.Repositories.Interfaces
{
    public interface IUsersRepo : IRepository<Users>
    {
        Task<Users> GetByEmailAsync(string email);
        Task<UserDataDto> GetPlayedData(int id);
    }
}

using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;

namespace ProjectPRN22_Backend.Services.Interfaces
{
    public interface IUserServices
    {
        Task<ResponsePublics<UserPublic>> GetAllUsers(QueryParam queryParam);
        Task<Users> GetUser(int id);
        Task<Users> CreateUser(Users users);
        Task<Users> UpdateUser(Users users);
        Task DeleteUser(int id);
        Task<Users> GetUserByEmail(string email);
        Task<UserDataDto> GetUserData(int id);
    }
}

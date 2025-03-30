using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Repositories.Implementations;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Services.Implementations
{
    public class UserServices : IUserServices
    {
        private IUsersRepo _usersRepo;
        public UserServices(IUsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }
        public async Task<Users> CreateUser(Users users)
        {
            return await _usersRepo.AddAsync(users);
        }

        public async Task DeleteUser(int id)
        {
            await _usersRepo.DeleteAsync(id);
        }

        public async Task<Users> GetUser(int id)
        {
            return await _usersRepo.GetByIdAsync(id);
        }

        public async Task<Users> UpdateUser(Users users)
        {
            return await _usersRepo.UpdateAsync(users);
        }

        public async Task<Users> GetUserByEmail(string email)
        {
            return await _usersRepo.GetByEmailAsync(email);
        }

        public async Task<UserDataDto> GetUserData(int id)
        {
            return await _usersRepo.GetPlayedData(id);
        }
    }
}

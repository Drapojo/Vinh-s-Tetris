using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Repositories.Interfaces;
using vinhvdqhe180173LAB1.Repositories.Implementations;

namespace ProjectPRN22_Backend.Repositories.Implementations
{
    public class UsersRepo : Repository<Users>, IUsersRepo
    {
        private readonly AppDBContext _context;
        public UsersRepo(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Users> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
        }

        public async Task<UserDataDto> GetPlayedData(int id)
        {
            IEnumerable<Histories> userHistories = await _context.Users.Include(u => u.Histories).Where(u => u.Id == id).Select(u => u.Histories).FirstOrDefaultAsync();
            int maxPoints = userHistories.Any() ? userHistories.Max(h => h.Points) : 0;

            return new UserDataDto
            {
                GamePlayed = userHistories.Count(),
                HighScore = maxPoints
            };
        }
    }
}

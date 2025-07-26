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

        public async Task<ResponsePublics<UserPublic>> GetAllWithQueryAsync(QueryParam queryParam)
        {
            IQueryable<Users> query = _context.Users.Include(u => u.Histories);

            if (!string.IsNullOrEmpty(queryParam.Search))
            {
                query = query.Where(u => u.Name.Contains(queryParam.Search) || u.Email.Contains(queryParam.Search));
            }

            int count = await query.CountAsync();

            if (!string.IsNullOrEmpty(queryParam.SortBy))
            {
                bool isAscending = queryParam.SortOrder?.ToLower() == "asc";
                query = isAscending
                    ? query.OrderBy(h => EF.Property<object>(h, queryParam.SortBy))
                    : query.OrderByDescending(h => EF.Property<object>(h, queryParam.SortBy));
            }

            int skip = queryParam.PageIndex * queryParam.PageSize;
            query = query.Skip(skip).Take(queryParam.PageSize);

            var data = await query.Select(u => new UserPublic
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Data = new UserDataDto
                {
                    GamePlayed = u.Histories.Count(),
                    HighScore = u.Histories.Any() ? u.Histories.Max(h => h.Points) : 0
                }
            }).ToListAsync();

            return new ResponsePublics<UserPublic>
            {
                Data = data,
                Count = count
            };
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

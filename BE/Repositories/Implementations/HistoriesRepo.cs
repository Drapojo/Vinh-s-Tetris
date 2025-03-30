using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Repositories.Interfaces;
using System.Linq;
using vinhvdqhe180173LAB1.Repositories.Implementations;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProjectPRN22_Backend.Repositories.Implementations
{
    public class HistoriesRepo : Repository<Histories>, IHistoriesRepo
    {
        private readonly AppDBContext _context;
        public HistoriesRepo(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<ResponsePublics<HistoryDto>> GetAllWithQueryAsync(QueryParam queryParam)
        {
            IQueryable<Histories> query = _context.Histories.Include(h => h.User);

            if (!string.IsNullOrEmpty(queryParam.Search))
            {
                query = query.Where(h => h.User.Name.Contains(queryParam.Search) || h.User.Email.Contains(queryParam.Search));
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

            var data = await query.Select(h => new HistoryDto
            {
                Id = h.Id,
                Date = h.Date,
                Level = h.Level,
                Lines = h.Lines,
                Points = h.Points,
                Time = h.Time,
                User = h.User,
            })
            .ToListAsync();
            return new ResponsePublics<HistoryDto>
            {
                Data = data,
                Count = count
            };
        }

        public async Task<ResponsePublics<HistoryDto>> GetByUserIdAsync(int userId, QueryParam queryParam)
        {
            IQueryable<Histories> query = _context.Histories.Include(h => h.User).Where(h => h.UserId == userId);

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

            var data = await query.Select(h => new HistoryDto
            {
                Id = h.Id,
                Date = h.Date,
                Level = h.Level,
                Lines = h.Lines,
                Points = h.Points,
                Time = h.Time,
                User = h.User,
            }).ToListAsync();
            return new ResponsePublics<HistoryDto>
            {
                Data = data,
                Count = count
            };
        }
    }
}

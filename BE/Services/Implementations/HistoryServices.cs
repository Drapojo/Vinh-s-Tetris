using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using ProjectPRN22_Backend.Repositories.Interfaces;
using ProjectPRN22_Backend.Services.Interfaces;

namespace ProjectPRN22_Backend.Services.Implementations
{
    public class HistoryServices : IHistoryServices
    {
        IHistoriesRepo _historiesRepo;
        public HistoryServices(IHistoriesRepo historiesRepo)
        {
            _historiesRepo = historiesRepo;
        }
        public async Task<Histories> AddHistory(Histories history)
        {
            return await _historiesRepo.AddAsync(history);
        }

        public async Task<ResponsePublics<HistoryDto>> GetHistoryByUserId(int userId, QueryParam queryParam)
        {
            return await _historiesRepo.GetByUserIdAsync(userId, queryParam);
        }

        public async Task<ResponsePublics<HistoryDto>> GetLeaderboard(QueryParam queryParam)
        {
            return await _historiesRepo.GetAllWithQueryAsync(queryParam);
        }
    }
}

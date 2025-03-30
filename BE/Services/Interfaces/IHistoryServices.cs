using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;

namespace ProjectPRN22_Backend.Services.Interfaces
{
    public interface IHistoryServices
    {
        Task<ResponsePublics<HistoryDto>> GetLeaderboard(QueryParam queryParam);
        Task<ResponsePublics<HistoryDto>> GetHistoryByUserId(int userId, QueryParam queryParam);
        Task<Histories> AddHistory(Histories history);
    }
}

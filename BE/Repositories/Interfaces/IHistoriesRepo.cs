using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Models.Schemas;
using vinhvdqhe180173LAB1.Repositories.Interfaces;

namespace ProjectPRN22_Backend.Repositories.Interfaces
{
    public interface IHistoriesRepo : IRepository<Histories>
    {
        Task<ResponsePublics<HistoryDto>> GetByUserIdAsync(int userId, QueryParam queryParam);
        Task<ResponsePublics<HistoryDto>> GetAllWithQueryAsync(QueryParam queryParam);
    }
}

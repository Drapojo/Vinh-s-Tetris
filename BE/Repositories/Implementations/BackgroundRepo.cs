using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using vinhvdqhe180173LAB1.Repositories.Implementations;

namespace ProjectPRN22_Backend.Repositories.Implementations
{
    public class BackgroundRepo : Repository<Backgrounds>, IBackgroundRepo
    {
        AppDBContext _context;
        public BackgroundRepo(AppDBContext appDBContext) : base(appDBContext)
        {
            _context = appDBContext;
        }

        public async Task<Backgrounds?> GetByNameAsync(string name)
        {
            return await _context.Backgrounds.FirstOrDefaultAsync(m => m.Name.Equals(name));
        }
    }
}

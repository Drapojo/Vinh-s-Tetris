using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Data;
using ProjectPRN22_Backend.Models.Entities;
using ProjectPRN22_Backend.Repositories.Interfaces;
using vinhvdqhe180173LAB1.Repositories.Implementations;

namespace ProjectPRN22_Backend.Repositories.Implementations
{
    public class MusicsRepo : Repository<Musics>, IMusicsRepo
    {
        AppDBContext _context;
        public MusicsRepo(AppDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Musics?> GetByNameAsync(string name)
        {
            return await _context.Musics.FirstOrDefaultAsync(m => m.Name.Equals(name));
        }
    }
}

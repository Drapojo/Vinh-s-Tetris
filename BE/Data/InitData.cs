using Microsoft.EntityFrameworkCore;
using ProjectPRN22_Backend.Models.Entities;

namespace ProjectPRN22_Backend.Data
{
    public class InitData
    {
        AppDBContext _context;

        public InitData(AppDBContext context)
        {
            _context = context;
        }

        public async Task GenData()
        {
            var musics = new List<Musics>
            {
                new Musics { Name = "Tetris", Url = "/ThemeSong.mp4" },
                new Musics { Name = "OMFG - Hello", Url = "/OMFG-Hello.mp3" },
                new Musics { Name = "Beethoven - Virus", Url = "/BeethovenVirus.mp3" }
            };

            foreach (var music in musics)
            {
                if (!await _context.Musics.AnyAsync(m => m.Name == music.Name))
                {
                    await _context.Musics.AddAsync(music);
                }
            }

            await _context.SaveChangesAsync();

            //var background = [
            //    new Backgrounds { Name = "Space", Url = "https://images.wallpapersden.com/image/download/galaxies-pixel-art_bGpsaW6UmZqaraWkpJRnZ2xqrWZnbWU.jpg" },
            //    new Backgrounds { Name = "Sky", Url = "https://static.vecteezy.com/system/resources/previews/042/818/355/non_2x/8bit-pixel-graphic-blue-sky-background-with-clouds-vector.jpg" },
            //    new Backgrounds { Name = "City", Url = "https://media.istockphoto.com/id/1279840008/vector/pixel-art-cyberpunk-metropolis-background.jpg?s=612x612&w=0&k=20&c=ngUv_uxrbqZgh29IROKv2oUYetEx7ONeb7pefdCkKVg="},
            //    new Backgrounds { Name = "City", Url = ""}
            //    ];

            //foreach (Musics music in musics)
            //{
            //    if (await _context.Musics.FirstOrDefaultAsync(m => m.Name.Equals(music.Name)) != null)
            //    {
            //        await _context.AddAsync(music);
            //    }
            //}
        }
    }
}

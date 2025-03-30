using ProjectPRN22_Backend.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Schemas
{
    public class HistoryDto
    {
        public int Id { get; set; }
        public int Lines { get; set; }
        public int Points { get; set; }
        public int Time { get; set; }
        public int Level { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public Users? User { get; set; }
    }
}

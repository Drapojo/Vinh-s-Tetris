using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class HistoriesBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Lines { get; set; }
        [Required]
        public int Points { get; set; }
        [Required]
        public int Time { get; set; }
        [Required]
        public int Level { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}

using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class MusicsBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }
    }
}

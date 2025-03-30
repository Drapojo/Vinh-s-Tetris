using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class BackgroundsBase
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class UsersBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Schemas
{
    public class UpdateUser
    {
        [Required]
        public string Name { get; set; }
    }
}

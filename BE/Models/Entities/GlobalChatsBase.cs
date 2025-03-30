using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class GlobalChatsBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Content { get; set; }
    }
}

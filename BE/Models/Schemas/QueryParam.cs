using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Schemas
{
    public class QueryParam
    {
        public string? Search { get; set; } = null;
        [Required]
        public int PageIndex { get; set; }
        [Required]
        public int PageSize { get; set; }
        public string? SortBy { get; set; } = null;
        public string? SortOrder { get; set; } = null;
    }
}

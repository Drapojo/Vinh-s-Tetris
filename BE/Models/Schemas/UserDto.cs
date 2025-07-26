using ProjectPRN22_Backend.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace ProjectPRN22_Backend.Models.Schemas
{
    public class UserPublic : UsersBase
    {
        public UserDataDto Data  { get; set; }
    }
}

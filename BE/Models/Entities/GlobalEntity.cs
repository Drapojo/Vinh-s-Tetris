using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectPRN22_Backend.Models.Entities
{
    public class Users : UsersBase
    {
        public virtual ICollection<GlobalChats>? GlobalChats { get; set; }
        public virtual ICollection<Histories>? Histories { get; set; }
    }
    public class Histories : HistoriesBase
    {
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual Users? User { get; set; }
    }
    public class GlobalChats : GlobalChatsBase
    {
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual Users? User { get; set; }
    }
    public class Backgrounds : BackgroundsBase { }
    public class Musics : MusicsBase { }
}

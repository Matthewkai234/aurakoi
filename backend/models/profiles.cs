using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("profiles")]
    public class User : BaseModel
    {
        [PrimaryKey("id")]
        public Guid Id { get; set; } 

        [Column("username")]
        public string Username { get; set; } = "";

        [Column("full_name")]
        public string FullName { get; set; } = "";

        [Column("user_confirmed")]
        public bool UserConfirmed { get; set; } = false;
    }
}
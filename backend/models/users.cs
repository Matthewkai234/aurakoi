using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("users")]
    public class User : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("email")]
        public string Email { get; set; } = "";
        [Column("password")]
        public string Password { get; set; } = "";
        [Column("username")]
        public string Username { get; set; } = "";
        [Column("full_name")]
        public string FullName { get; set; } = "";
    }
}

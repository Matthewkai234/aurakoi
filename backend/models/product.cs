using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("products")]
    public class Product : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }
        [Column("title")]
        public string Title { get; set; } = "";
        [Column("category")]
        public string Category { get; set; } = "";
        [Column("price")]
        public float Price { get; set; }
        [Column("description")]
        public string? Description { get; set; } = "";
        [Column("image_url")]
        public string? ImageUrl { get; set; } = "";
        [Column("sizes")]
        public string[]? Sizes { get; set; } = null;
        [Column("stock")]
        public int Stock { get; set; }
        [Column("sub_category")]
        public string SubCategory { get; set; } = ""; 
        [Column("icon_image")]
        public string? IconImage { get; set; } = "";
    }
}
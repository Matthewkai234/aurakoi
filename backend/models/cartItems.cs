using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace Backend.Models
{
    [Table("cart_items")]
    public class CartItem : BaseModel
    {
        [PrimaryKey("id")]
        public int Id { get; set; }

        [Column("product_id")]
        public int ProductId { get; set; }

        [Column("quantity")]
        public int Quantity { get; set; } = 1;

        [Column("selected_size")]
        public string? SelectedSize { get; set; } = null;

        [Column("selected_color")]
        public string? SelectedColor { get; set; } = null;

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
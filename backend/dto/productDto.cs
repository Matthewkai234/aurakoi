namespace Backend.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Category { get; set; } = "";
        public float Price { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string[]? Sizes { get; set; }
        public int Stock { get; set; }
        public string SubCategory { get; set; } = "";
        public string? IconImage { get; set; }
    }
}
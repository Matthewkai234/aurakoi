namespace Backend.DTOs
{
    public class profileDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; } = "";
        public string FullName { get; set; } = "";
        public bool UserConfirmed { get; set; } = false;

    }
}
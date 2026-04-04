using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Supabase;
using Backend.DTOs;
using BCrypt.Net;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly Client _supabase;

        public UsersController(Client supabase)
        {
            _supabase = supabase;
        }

        // GET all users (safe version)
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _supabase.From<User>().Get();
            var users = response.Models.Select(p => new UserDto
            {
                Id = p.Id,
                Username = p.Username,
                Email = p.Email,
                FullName = p.FullName
            }).ToList();

            return Ok(users);
        }

        // GET user by username
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var response = await _supabase
                .From<User>()
                .Where(u => u.Username == username)
                .Get();

            if (response.Models.Count == 0)
                return NotFound();

            var user = response.Models.First();

            return Ok(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName
            });
        }

        // SIGNUP
        [HttpPost("/signup")]
        public async Task<IActionResult> SignUp([FromBody] UserInputDto newUser)
        {
            var existing = await _supabase
                .From<User>()
                .Where(u => u.Email == newUser.Email || u.Username == newUser.Username)
                .Get();

            if (existing.Models.Count > 0)
                return Conflict(new { message = "Email or username already exists" });

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(newUser.Password);

            var response = await _supabase.From<User>().Insert(new User
            {
                Username = newUser.Username,
                FullName = newUser.FullName,
                Email = newUser.Email,
                Password = hashedPassword
            });

            if (response.Models.Count == 0)
                return BadRequest(new { message = "Failed to create user" });

            var user = response.Models.First();

            return Ok(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserInputDto loginUser)
        {
            var response = await _supabase
                .From<User>()
                .Where(u => u.Email == loginUser.Email)
                .Get();

            if (response.Models.Count == 0)
                return Unauthorized(new { message = "Invalid email or password" });

            var user = response.Models.First();

            // Verify password
            bool validPassword = BCrypt.Net.BCrypt.Verify(loginUser.Password, user.Password);
            if (!validPassword)
                return Unauthorized(new { message = "Invalid email or password" });

            // Return safe user info
            return Ok(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                FullName = user.FullName
            });
        }
    }
}
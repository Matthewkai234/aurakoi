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

    }
}
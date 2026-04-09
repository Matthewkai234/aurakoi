using Microsoft.AspNetCore.Mvc;
using Supabase;
using Backend.Models;
using Backend.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly Client _supabase;

        public ProfilesController(Client supabase)
        {
            _supabase = supabase;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _supabase.From<Profile>().Get();
            var profiles = response.Models.Select(p => new profileDto
            {
                Id = p.Id,
                Username = p.Username,
                FullName = p.FullName,
                UserConfirmed = p.UserConfirmed
            }).ToList();

            return Ok(profiles);
        }

         [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var response = await _supabase
                .From<Profile>()
                .Where(p => p.Id == id)
                .Get();

            var profile = response.Models.FirstOrDefault();

            if (profile == null) return NotFound();

            var dto = new profileDto
            {
                Id = profile.Id,
                Username = profile.Username,
                FullName = profile.FullName,
                UserConfirmed = profile.UserConfirmed
            };

            return Ok(dto);
        }
    }
}

           
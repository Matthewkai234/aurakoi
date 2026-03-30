using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Capsule Protein Shake", Category = "Protein", Price = 29.99 },
            new Product { Id = 2, Name = "Capsule Gym Shirt", Category = "Clothes", Price = 19.99 },
            new Product { Id = 3, Name = "Capsule Vitamins", Category = "Vitamins", Price = 14.99 },
            new Product { Id = 4, Name = "Capsule Training Program", Category = "Program", Price = 49.99 }
        };

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }
    }
}
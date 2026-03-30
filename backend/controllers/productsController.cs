// using Microsoft.AspNetCore.Mvc;
// using Backend.Models;

// namespace Backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ProductsController : ControllerBase
//     {

//         [HttpGet]
//         public IActionResult GetAll()
//         {
//             return Ok(products);
//         }

//         [HttpGet("{id}")]
//         public IActionResult GetById(int id)
//         {
//             var product = products.FirstOrDefault(p => p.Id == id);
//             if (product == null) return NotFound();
//             return Ok(product);
//         }
//     }
// }
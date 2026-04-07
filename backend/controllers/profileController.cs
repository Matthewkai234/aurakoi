// using Microsoft.AspNetCore.Mvc;
// using Backend.Models;
// using Supabase;
// using Backend.DTOs;

// namespace Backend.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ProfileController : ControllerBase
//     {
//         private readonly Client _supabase;

//         public ProductsController(Client supabase)
//         {
//             _supabase = supabase;
//         }

//         [HttpGet]
//         public async Task<IActionResult> GetAll()
//         {
//             var response = await _supabase.From<Product>().Get();
//             var products = response.Models.Select(p => new ProductDto
//             {
//                 Id = p.Id,
//                 Title = p.Title,
//                 Category = p.Category,
//                 Price = p.Price,
//                 Description = p.Description,
//                 ImageUrl = p.ImageUrl,
//                 Sizes = p.Sizes,
//                 Stock = p.Stock,
//                 SubCategory = p.SubCategory,
//                 IconImage = p.IconImage
//             }).ToList();

//             return Ok(products);
//         }

//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetById(int id)
//         {
//             var response = await _supabase
//                 .From<Product>()
//                 .Where(p => p.Id == id)
//                 .Get();

//             var product = response.Models.FirstOrDefault();

//             if (product == null) return NotFound();

//             var dto = new ProductDto
//             {
//                 Id = product.Id,
//                 Title = product.Title,
//                 Category = product.Category,
//                 Price = product.Price,
//                 Description = product.Description,
//                 ImageUrl = product.ImageUrl,
//                 Sizes = product.Sizes,
//                 Stock = product.Stock,
//                 SubCategory = product.SubCategory,
//                 IconImage = product.IconImage
//             };

//             return Ok(dto);
//         }
//         [HttpGet("category/{category}")]
//         public async Task<IActionResult> GetByCategory(string category)
//         {
//             var response = await _supabase
//                 .From<Product>()
//                 .Where(p => p.Category == category)
//                 .Select("*")
//                 .Get();
//             var products = response.Models.Select(p => new ProductDto
//             {
//                 Id = p.Id,
//                 Title = p.Title,
//                 Category = p.Category,
//                 Price = p.Price,
//                 Description = p.Description,
//                 ImageUrl = p.ImageUrl,
//                 Sizes = p.Sizes,
//                 Stock = p.Stock,
//                 SubCategory = p.SubCategory,
//                 IconImage = p.IconImage
//             }).ToList();

//             return Ok(products);
//         }

//         [HttpGet("sub-category/{subCategory}")]
//         public async Task<IActionResult> GetBySubCategory(string subCategory)
//         {
//             var response = await _supabase
//                 .From<Product>()
//                 .Where(p => p.SubCategory == subCategory)
//                 .Select("*")
//                 .Get();

//             var products = response.Models.Select(p => new ProductDto
//             {
//                 Id = p.Id,
//                 Title = p.Title,
//                 Category = p.Category,
//                 Price = p.Price,
//                 Description = p.Description,
//                 ImageUrl = p.ImageUrl,
//                 Sizes = p.Sizes,
//                 Stock = p.Stock,
//                 SubCategory = p.SubCategory,
//                 IconImage = p.IconImage
//             }).ToList();

//             return Ok(products);
//         }
//     }
// }
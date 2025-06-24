using Microsoft.AspNetCore.Mvc;
using Canadel.DTOs;
using Canadel.Models;
using Canadel.Services;

namespace Canadel.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ProductController(IProductService service) : BaseController
  {
    [HttpPost("add")]
    public async Task<ActionResult<Product>> AddProduct([FromBody] ProductDTO productDTO)
    {
      return await ExecuteAction(async () => await service.AddProduct(productDTO));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProduct(int id)
    {
      return await ExecuteAction(async () => await service.DeleteProduct(id));
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<Product>>> GetAllProducts()
    {
      return await ExecuteAction(async () => await service.GetAllProducts());
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
      return await ExecuteAction(async () => await service.GetProductById(id));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] ProductDTO productDTO)
    {
      return await ExecuteAction(async () => await service.UpdateProduct(id, productDTO));
    }
  }
}

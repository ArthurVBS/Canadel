using Microsoft.AspNetCore.Mvc;
using Canadel.DTOs;
using Canadel.Models;
using Canadel.Services;

namespace Canadel.Controllers
{
  [ApiController]
  [Route("[controller]s")]
  public class ProductController(IProductService service) : BaseController
  {
    [HttpPost]
    public async Task<ActionResult<Product>> AddProduct([FromBody] ProductDTO productDTO)
    {
      return await ExecuteAction(() => service.AddProduct(productDTO));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProduct(int id)
    {
      return await ExecuteAction(() => service.DeleteProduct(id));
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAllProducts()
    {
      return await ExecuteAction(() => service.GetAllProducts());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
      return await ExecuteAction(() => service.GetProductById(id));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] ProductDTO productDTO)
    {
      return await ExecuteAction(() => service.UpdateProduct(id, productDTO));
    }
  }
}

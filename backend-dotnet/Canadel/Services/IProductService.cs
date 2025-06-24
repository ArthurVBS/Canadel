using Canadel.DTOs;
using Canadel.Models;

namespace Canadel.Services
{
  public interface IProductService
  {
    Task<Product> AddProduct(ProductDTO productDTO);

    Task<Product> DeleteProduct(int id);

    Task<List<Product>> GetAllProducts();

    Task<Product> GetProductById(int id);

    Task<Product> UpdateProduct(int id, ProductDTO productDTO);
  }
}

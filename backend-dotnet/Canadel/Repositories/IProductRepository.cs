using Canadel.Models;

namespace Canadel.Repositories
{
  public interface IProductRepository
  {
    Task AddProductAsync(Product product);

    Task DeleteProductAsync(Product product);

    Task<List<Product>> GetAllProductsAsync();

    Task<Product> GetProductByIdAsync(int id);

    Task UpdateProductAsync(Product product);
  }
}

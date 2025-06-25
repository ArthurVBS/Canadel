using Microsoft.EntityFrameworkCore;
using Canadel.Constants;
using Canadel.Data;
using Canadel.Exceptions;
using Canadel.Models;

namespace Canadel.Repositories
{
  public class ProductRepository(AppDbContext context) : IProductRepository
  {
    public async Task AddProductAsync(Product product)
    {
      await context.Products.AddAsync(product);
      await context.SaveChangesAsync();
    }

    public async Task DeleteProductAsync(Product product)
    {
      context.Products.Remove(product);
      await context.SaveChangesAsync();
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
      return await context.Products.ToListAsync();
    }

    public async Task<Product> GetProductByIdAsync(int id)
    {
      Product? product = await context.Products.FindAsync(id);

      if (product != null)
      {
        return product;
      }
      else
      {
        throw new BusinessException(ExceptionMessages.PRODUCT_NOT_FOUND);
      }
    }

    public async Task UpdateProductAsync(Product product)
    {
      var existingProduct = await GetProductByIdAsync(product.Id);

      existingProduct.Name = product.Name;
      existingProduct.Description = product.Description;
      existingProduct.Price = product.Price;

      await context.SaveChangesAsync();
    }
  }
}

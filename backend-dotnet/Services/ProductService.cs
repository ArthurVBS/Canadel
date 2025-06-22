using NewCanadel.Constants;
using NewCanadel.Controllers;
using NewCanadel.DTOs;
using NewCanadel.Exceptions;
using NewCanadel.Models;
using NewCanadel.Repositories;

namespace NewCanadel.Services
{
  public class ProductService(ProductRepository repository, ILogger<ProductService> logger)
  {
    public async Task<Product> AddProduct(ProductDTO productDTO)
    {
      ValidateProduct(productDTO);
      Product productEntity = productDTO.ToEntity();

      await repository.AddProductAsync(productEntity);
      Product product = await repository.GetProductByIdAsync(productEntity.Id);

      logger.LogInformation(LoggerMessages.PRODUCT_ADDED);
      return product;
    }

    public async Task<Product> DeleteProduct(int id)
    {
      Product product = await repository.GetProductByIdAsync(id);
      await repository.DeleteProductAsync(product);

      logger.LogInformation(LoggerMessages.PRODUCT_DELETED);
      return product;
    }

    public async Task<List<Product>> GetAllProducts()
    {
      List<Product> products = await repository.GetAllProductsAsync();
      logger.LogInformation(LoggerMessages.PRODUCTS_FOUND);
      return products;
    }

    public async Task<Product> GetProductById(int id)
    {
      Product product = await repository.GetProductByIdAsync(id);
      logger.LogInformation(LoggerMessages.PRODUCT_FOUND_BY_ID);
      return product;
    }

    public async Task<Product> UpdateProduct(int id, ProductDTO productDTO)
    {
      ValidateProduct(productDTO);
      Product productEntity = productDTO.ToEntity();
      productEntity.Id = id;

      await repository.UpdateProductAsync(productEntity);
      Product product = await repository.GetProductByIdAsync(productEntity.Id);

      logger.LogInformation(LoggerMessages.PRODUCT_UPDATED);
      return product;
    }

    private void ValidateProduct(ProductDTO productDTO)
    {
      bool isNameEmpty = String.IsNullOrEmpty(productDTO.Name);
      bool isDescriptionEmpty = String.IsNullOrEmpty(productDTO.Description);
      bool isPriceEmpty = productDTO.Price.Equals(0);

      if (isNameEmpty || isDescriptionEmpty || isPriceEmpty)
      {
        throw new BusinessException(ExceptionMessages.PRODUCT_WITH_EMPTY_VALUES);
      }
    }
  }
}

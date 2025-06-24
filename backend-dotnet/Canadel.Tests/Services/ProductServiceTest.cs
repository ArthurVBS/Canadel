using Canadel.DTOs;
using Canadel.Models;
using Canadel.Repositories;
using Canadel.Services;
using Microsoft.Extensions.Logging;
using Moq;

namespace Canadel.Tests.Services
{
  public class ProductServiceTest
  {
    private static readonly Product SAMPLE_PRODUCT = new()
    {
      Id = 1,
      Name = "Test 1",
      Description = "Test 1",
      Price = 11.5m,
      CreatedAt = DateTime.Now,
    };

    private static readonly Product ANOTHER_PRODUCT = new()
    {
      Id = 2,
      Name = "Test 2",
      Description = "Test 2",
      Price = 12.5m,
      CreatedAt = DateTime.Now,
    };

    private static readonly ProductDTO SAMPLE_PRODUCT_DTO = new()
    {
      Name = SAMPLE_PRODUCT.Name,
      Description = SAMPLE_PRODUCT.Description,
      Price = SAMPLE_PRODUCT.Price,
    };

    private static readonly int SAMPLE_PRODUCT_ID = 1;

    private static readonly Mock<IProductRepository> mockRepository = new();

    private static readonly Mock<ILogger<ProductService>> mockLogger = new();

    [Fact]
    public async Task ShouldAddProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockRepository.Setup(s => s.AddProductAsync(It.IsAny<Product>())).Returns(Task.CompletedTask);
      mockRepository.Setup(s => s.GetProductByIdAsync(It.IsAny<int>())).ReturnsAsync(mockProduct);

      // When
      var service = new ProductService(mockRepository.Object, mockLogger.Object);
      var result = await service.AddProduct(SAMPLE_PRODUCT_DTO);

      // Then
      Assert.NotNull(result);
      Assert.Equal(SAMPLE_PRODUCT, result);
    }

    [Fact]
    public async Task ShouldDeleteProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockRepository.Setup(s => s.DeleteProductAsync(It.IsAny<Product>())).Returns(Task.CompletedTask);
      mockRepository.Setup(s => s.GetProductByIdAsync(It.IsAny<int>())).ReturnsAsync(mockProduct);

      // When
      var service = new ProductService(mockRepository.Object, mockLogger.Object);
      var result = await service.DeleteProduct(SAMPLE_PRODUCT_ID);

      // Then
      Assert.NotNull(result);
      Assert.Equal(SAMPLE_PRODUCT, result);
    }

    [Fact]
    public async Task ShouldGetAllProducts()
    {
      // Given
      var mockProducts = new List<Product>
      {
        SAMPLE_PRODUCT,
        ANOTHER_PRODUCT
      };
      mockRepository.Setup(s => s.GetAllProductsAsync()).ReturnsAsync(mockProducts);

      // When
      var service = new ProductService(mockRepository.Object, mockLogger.Object);
      var result = await service.GetAllProducts();

      // Then
      Assert.NotNull(result);
      Assert.Equal(2, result.Count);
    }

    [Fact]
    public async Task ShouldGetProductById()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockRepository.Setup(s => s.GetProductByIdAsync(It.IsAny<int>())).ReturnsAsync(mockProduct);

      // When
      var service = new ProductService(mockRepository.Object, mockLogger.Object);
      var result = await service.GetProductById(SAMPLE_PRODUCT_ID);

      // Then
      Assert.NotNull(result);
      Assert.Equal(SAMPLE_PRODUCT, result);
    }

    [Fact]
    public async Task ShouldUpdateProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockRepository.Setup(s => s.UpdateProductAsync(It.IsAny<Product>())).Returns(Task.CompletedTask);
      mockRepository.Setup(s => s.GetProductByIdAsync(It.IsAny<int>())).ReturnsAsync(mockProduct);

      // When
      var service = new ProductService(mockRepository.Object, mockLogger.Object);
      var result = await service.UpdateProduct(SAMPLE_PRODUCT_ID, SAMPLE_PRODUCT_DTO);

      // Then
      Assert.NotNull(result);
      Assert.Equal(SAMPLE_PRODUCT, result);
    }
  }
}

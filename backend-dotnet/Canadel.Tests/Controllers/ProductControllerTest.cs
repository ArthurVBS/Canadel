using Canadel.Controllers;
using Canadel.DTOs;
using Canadel.Models;
using Canadel.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Canadel.Tests.Controllers
{
  public class ProductControllerTest
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

    private static readonly Mock<IProductService> mockService = new();

    [Fact]
    public async Task ShouldAddProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockService.Setup(s => s.AddProduct(SAMPLE_PRODUCT_DTO)).ReturnsAsync(mockProduct);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.AddProduct(SAMPLE_PRODUCT_DTO);

      // Then
      Assert.NotNull(result);

      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var productResult = Assert.IsType<Product>(okResult.Value);

      Assert.Equal(SAMPLE_PRODUCT, productResult);
    }

    [Fact]
    public async Task ShouldDeleteProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockService.Setup(s => s.DeleteProduct(SAMPLE_PRODUCT_ID)).ReturnsAsync(mockProduct);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.DeleteProduct(SAMPLE_PRODUCT_ID);

      // Then
      Assert.NotNull(result);

      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var productResult = Assert.IsType<Product>(okResult.Value);

      Assert.Equal(SAMPLE_PRODUCT, productResult);
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
      mockService.Setup(s => s.GetAllProducts()).ReturnsAsync(mockProducts);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.GetAllProducts();

      // Then
      Assert.NotNull(result);

      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var productsResult = Assert.IsType<List<Product>>(okResult.Value);

      Assert.Equal(2, productsResult.Count);
    }

    [Fact]
    public async Task ShouldGetProductById()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockService.Setup(s => s.GetProductById(SAMPLE_PRODUCT_ID)).ReturnsAsync(mockProduct);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.GetProductById(SAMPLE_PRODUCT_ID);

      // Then
      Assert.NotNull(result);

      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var productResult = Assert.IsType<Product>(okResult.Value);

      Assert.Equal(SAMPLE_PRODUCT, productResult);
    }

    [Fact]
    public async Task ShouldUpdateProduct()
    {
      // Given
      var mockProduct = SAMPLE_PRODUCT;
      mockService.Setup(s => s.UpdateProduct(SAMPLE_PRODUCT_ID, SAMPLE_PRODUCT_DTO)).ReturnsAsync(mockProduct);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.UpdateProduct(SAMPLE_PRODUCT_ID, SAMPLE_PRODUCT_DTO);

      // Then
      Assert.NotNull(result);

      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var productResult = Assert.IsType<Product>(okResult.Value);

      Assert.Equal(SAMPLE_PRODUCT, productResult);
    }
  }
}

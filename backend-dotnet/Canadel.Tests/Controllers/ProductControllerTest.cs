using Canadel.Controllers;
using Canadel.Models;
using Canadel.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Canadel.Tests.Controllers
{
  public class ProductControllerTest
  {
    private readonly Product SAMPLE_PRODUCT = new()
    {
      Id = 1,
      Name = "Test 1",
      Description = "Test 1",
      Price = 11.5m,
      CreatedAt = DateTime.Now,
    };

    private readonly Product ANOTHER_PRODUCT = new()
    {
      Id = 2,
      Name = "Test 2",
      Description = "Test 2",
      Price = 12.5m,
      CreatedAt = DateTime.Now,
    };

    [Fact]
    public async Task ShouldGetAllProducts()
    {
      // Given
      var mockProducts = new List<Product>
      {
        SAMPLE_PRODUCT,
        ANOTHER_PRODUCT
      };
      var mockService = new Mock<IProductService>();
      mockService.Setup(s => s.GetAllProducts()).ReturnsAsync(mockProducts);

      // When
      var controller = new ProductController(mockService.Object);
      var result = await controller.GetAllProducts();

      // Then
      var okResult = Assert.IsType<OkObjectResult>(result.Result);
      var products = Assert.IsType<List<Product>>(okResult.Value);

      Assert.Equal(2, products.Count);
    }
  }
}

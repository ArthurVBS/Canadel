using Canadel.Data;
using Canadel.Models;
using Canadel.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Canadel.Tests.Repositories
{
  public class ProductRepositoryTest
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

    private static AppDbContext CreateInMemoryDbContext(string dbName)
    {
      var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: dbName).Options;
      return new AppDbContext(options);
    }

    [Fact]
    public async Task ShouldAddProductAsync()
    {
      // Given
      var dbName = Guid.NewGuid().ToString();
      using (var context = CreateInMemoryDbContext(dbName))
      {
        context.Products.AddRange(SAMPLE_PRODUCT);
        await context.SaveChangesAsync();
      }

      // When
      using (var context = CreateInMemoryDbContext(dbName))
      {
        var repository = new ProductRepository(context);
        await repository.AddProductAsync(ANOTHER_PRODUCT);
        var result = await repository.GetAllProductsAsync();

        // Then
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        Assert.Contains(ANOTHER_PRODUCT, result);
      }
    }

    [Fact]
    public async Task ShouldDeleteProductAsync()
    {
      // Given
      var dbName = Guid.NewGuid().ToString();
      using (var context = CreateInMemoryDbContext(dbName))
      {
        context.Products.AddRange(SAMPLE_PRODUCT, ANOTHER_PRODUCT);
        await context.SaveChangesAsync();
      }

      // When
      using (var context = CreateInMemoryDbContext(dbName))
      {
        var repository = new ProductRepository(context);
        await repository.DeleteProductAsync(ANOTHER_PRODUCT);
        var result = await repository.GetAllProductsAsync();

        // Then
        Assert.NotNull(result);
        Assert.Single(result);

        var assertProducts = new List<Product>() { SAMPLE_PRODUCT };
        Assert.Equivalent(assertProducts, result);
      }
    }

    [Fact]
    public async Task ShouldGetAllProductsAsync()
    {
      // Given
      var dbName = Guid.NewGuid().ToString();
      using (var context = CreateInMemoryDbContext(dbName))
      {
        context.Products.AddRange(SAMPLE_PRODUCT, ANOTHER_PRODUCT);
        await context.SaveChangesAsync();
      }

      // When
      using (var context = CreateInMemoryDbContext(dbName))
      {
        var repository = new ProductRepository(context);
        var result = await repository.GetAllProductsAsync();

        // Then
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
      }
    }

    [Fact]
    public async Task ShouldGetProductByIdAsync()
    {
      // Given
      var dbName = Guid.NewGuid().ToString();
      using (var context = CreateInMemoryDbContext(dbName))
      {
        context.Products.AddRange(SAMPLE_PRODUCT, ANOTHER_PRODUCT);
        await context.SaveChangesAsync();
      }

      // When
      using (var context = CreateInMemoryDbContext(dbName))
      {
        var repository = new ProductRepository(context);
        var result = await repository.GetProductByIdAsync(SAMPLE_PRODUCT.Id);

        // Then
        Assert.NotNull(result);
        Assert.Equivalent(SAMPLE_PRODUCT, result);
      }
    }

    [Fact]
    public async Task ShouldUpdateProductAsync()
    {
      // Given
      var dbName = Guid.NewGuid().ToString();
      using (var context = CreateInMemoryDbContext(dbName))
      {
        context.Products.AddRange(SAMPLE_PRODUCT, ANOTHER_PRODUCT);
        await context.SaveChangesAsync();
      }

      // When
      using (var context = CreateInMemoryDbContext(dbName))
      {
        var repository = new ProductRepository(context);
        await repository.UpdateProductAsync(ANOTHER_PRODUCT);
        var result = await repository.GetAllProductsAsync();

        // Then
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);

        var assertProducts = new List<Product>() { SAMPLE_PRODUCT, ANOTHER_PRODUCT };
        Assert.Equivalent(assertProducts, result);
      }
    }
  }
}

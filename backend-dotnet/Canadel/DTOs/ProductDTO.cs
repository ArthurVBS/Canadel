using Canadel.Models;

namespace Canadel.DTOs
{
  public class ProductDTO
  {
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; } = 0;
    public DateTime? CreatedAt { get; set; }

    public Product ToEntity()
    {
      Product product = new()
      {
        Name = Name,
        Description = Description,
        Price = Price,
        CreatedAt = CreatedAt ?? DateTime.Now
      };
      return product;
    }

  }
}

using Microsoft.EntityFrameworkCore;
using NewCanadel.Models;

namespace NewCanadel.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Product> Products { get; set; }
  }
}

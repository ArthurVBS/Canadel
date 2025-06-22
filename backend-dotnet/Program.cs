using Microsoft.EntityFrameworkCore;
using NewCanadel.Data;
using NewCanadel.Repositories;
using NewCanadel.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=canadel.db"));

builder.Services.AddScoped<ProductService>();

builder.Services.AddScoped<ProductRepository>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod();
  });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  dbContext.Database.EnsureDeleted();
  dbContext.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();

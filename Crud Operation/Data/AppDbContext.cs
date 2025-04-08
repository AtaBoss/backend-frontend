using Crud_Operation.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Crud_Operation.Models;


namespace Crud_Operation.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }  // Пример модели Product
    }
}

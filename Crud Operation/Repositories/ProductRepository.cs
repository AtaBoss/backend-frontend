using Crud_Operation.Models;
using System.Xml.Linq;

namespace Crud_Operation.Repositories
{
    public static class ProductRepository
    {
        private static List<Product> _products = new()
        {
            new Product { Id = 1, Name = "Apple", Price = 1.2m },
            new Product { Id = 2, Name = "Banana", Price = 0.8m }
        };

        public static List<Product> GetAll() => _products;

        public static Product? GetById(int id) =>
            _products.FirstOrDefault(p => p.Id == id);

        public static void Add(Product product)
        {
            product.Id = _products.Max(p => p.Id) + 1;
            _products.Add(product);
        }

        public static void Update(Product product)
        {
            var index = _products.FindIndex(p => p.Id == product.Id);
            if (index != -1)
                _products[index] = product;
        }

        public static void Delete(int id)
        {
            var product = GetById(id);
            if (product != null)
                _products.Remove(product);
        }
    }
}

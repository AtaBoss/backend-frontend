namespace Crud_Operation.Models
{
    public class Product
    {
        public int Id { get; set; } // уникальный ID
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}

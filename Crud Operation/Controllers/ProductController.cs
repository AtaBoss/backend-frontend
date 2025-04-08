using Crud_Operation.Models;
using Crud_Operation.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crud_Operation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll() => Ok(ProductRepository.GetAll());

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = ProductRepository.GetById(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            ProductRepository.Add(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product updatedProduct)
        {
            var product = ProductRepository.GetById(id);
            if (product == null) return NotFound();

            updatedProduct.Id = id;
            ProductRepository.Update(updatedProduct);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = ProductRepository.GetById(id);
            if (product == null) return NotFound();

            ProductRepository.Delete(id);
            return NoContent();
        }
    }
}

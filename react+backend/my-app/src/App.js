import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // Получаем все продукты
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5129/api/Product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Добавление нового продукта
  const addProduct = async (product) => {
    try {
      await axios.post("http://localhost:5129/api/Product", {
        name: newProduct.name,
        price: parseFloat(newProduct.price), // 👈 важно
      });
      fetchProducts(); // обновляем список продуктов
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Обновление продукта
  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:5129/api/Product/${id}`, {
        name: updatedProduct.name,
        price: parseFloat(updatedProduct.price),
      });

      fetchProducts(); // обновляем список продуктов
      setEditingProduct(null); // закрываем форму редактирования
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Удаление продукта
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5129/api/Product/${id}`);

      fetchProducts(); // обновляем список продуктов
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Форма добавления нового продукта
  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    setNewProduct({ name: "", price: "" }); // очищаем форму
  };

  // Форма редактирования продукта
  const handleEditProduct = (e) => {
    e.preventDefault();
    updateProduct(editingProduct.id, editingProduct);
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* Форма для добавления нового продукта */}
      <form onSubmit={handleAddProduct}>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Таблица с продуктами */}
      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                {/* Кнопка для редактирования */}
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                {/* Кнопка для удаления */}
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Форма для редактирования продукта */}
      {editingProduct && (
        <form onSubmit={handleEditProduct}>
          <h3>Edit Product</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            required
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditingProduct(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imageFile: null,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("/get-products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("imageFile", product.imageFile);

    try {
      const response = await axios.post("/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Ürün başarıyla eklendi.");
      // İşlem başarılı olduğunda sayfayı yenileme ya da başka bir işlem yapma
      getProducts(); // Yeni ürün eklendikten sonra ürünleri güncelle
    } catch (error) {
      alert("Ürün eklenirken bir hata oluştu.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Ürün Ekleme Formu</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ürün Adı:</label>
        <br />
        <input type="text" id="name" name="name" value={product.name} onChange={handleInputChange} required />
        <br />
        <br />

        <label htmlFor="description">Açıklama:</label>
        <br />
        <textarea id="description" name="description" value={product.description} onChange={handleInputChange}></textarea>
        <br />
        <br />

        <label htmlFor="price">Fiyat:</label>
        <br />
        <input type="number" id="price" name="price" value={product.price} onChange={handleInputChange} required />
        <br />
        <br />

        <label htmlFor="imageFile">Resim:</label>
        <br />
        <input type="file" id="imageFile" name="imageFile" onChange={handleImageChange} accept="image/*" required />
        <br />
        <br />

        <button type="submit">Ekle</button>
      </form>

      <h2>Mevcut Ürünler</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price} TL
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddProduct;

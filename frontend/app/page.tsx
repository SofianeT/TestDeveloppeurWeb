"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./Form/ProductForm";
import { Product } from "./types/product";
import "./styles/home.css";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des produits", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSuccess = () => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => setProducts(response.data))
      .catch((err) =>
        console.error("Erreur lors de la récupération des produits", err)
      );

    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Liste des Produits</h1>

      <div className="flex justify-end mb-6">
        <button onClick={handleAddProduct} className="add-button">
          Ajouter un produit
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image || "/default-image.jpg"} // Image par défaut si aucune image
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Prix: {product.price} €</p>
              <p className="product-stock">Stock: {product.stock}</p>
              <div className="action-buttons">
                <button
                  onClick={() => handleEdit(product)}
                  className="action-button edit-button"
                >
                  Modifier
                </button>
                <button
                  onClick={() =>
                    product.id !== undefined && deleteProduct(product.id)
                  }
                  className="action-button delete-button"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <ProductForm
              product={selectedProduct ?? undefined}
              onSuccess={handleSuccess}
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-button"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

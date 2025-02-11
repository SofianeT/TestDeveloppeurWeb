"use client";

import { Product } from "../types/product";
import axios from "axios";
import { useState } from "react";
import "../styles/form.css";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [name, setName] = useState(() => product?.name || "");
  const [price, setPrice] = useState(() => product?.price?.toString() || "");
  const [description, setDescription] = useState(
    () => product?.description || ""
  );
  const [stock, setStock] = useState(() => product?.stock?.toString() || "0");
  const [image, setImage] = useState(() => product?.image || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock),
      image,
    };

    try {
      if (product) {
        await axios.put(
          `http://localhost:3001/products/${product.id}`,
          payload
        );
      } else {
        await axios.post("http://localhost:3001/products", payload);
      }
      onSuccess();
    } catch (err) {
      console.error("Erreur lors de la soumission du produit", err);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {product ? "Mettre à jour le produit" : "Créer un produit"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nom</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du produit"
          />
        </div>
        <div>
          <label>Prix</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix du produit"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du produit"
            rows={3}
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Quantité en stock"
          />
        </div>
        <div>
          <label>Image (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL de l'image"
          />
        </div>
        <button type="submit">{product ? "Mettre à jour" : "Créer"}</button>
      </form>
    </div>
  );
}

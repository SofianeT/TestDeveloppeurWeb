import { Product } from "../types/product";
import axios from "axios";
import { useState } from "react";

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [name, setName] = useState(() => product?.name || "");
  const [price, setPrice] = useState(() => product?.price?.toString() || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, price: parseFloat(price) };

    if (product) {
      await axios.put(`http://localhost:3001/products/${product.id}`, payload);
    } else {
      await axios.post("http://localhost:3001/products", payload);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Prix</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {product ? "Mettre à jour" : "Créer"}
      </button>
    </form>
  );
}

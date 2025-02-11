"use client"; // Force tout le rendu côté client
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:3000/products");
  return data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>
      <ul>
        {data.map((product: any) => (
          <li key={product.id} className="border p-2 mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

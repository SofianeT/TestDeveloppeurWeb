import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../Form/ProductForm"; // Importer le composant de formulaire
import { Product } from "../types/product"; // Importer l'interface Product

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Contrôler l'état de la pop-up
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Pour modifier un produit

  // Récupérer les produits depuis l'API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  // Supprimer un produit
  const deleteProduct = async (id: number) => {
    try {
      // Suppression du produit
      await axios.delete(`http://localhost:3001/products/${id}`);

      // Recharge les produits après suppression
      const response = await axios.get("http://localhost:3001/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit", error);
    }
  };

  // Ouvrir le modal pour ajouter un produit
  const openModal = () => {
    setSelectedProduct(null); // Réinitialiser pour un produit vide
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Appeler cette fonction lors du succès de l'ajout ou modification
  const handleSuccess = () => {
    fetchProducts(); // Recharger les produits
    closeModal(); // Fermer le modal
  };

  // Récupérer les produits au montage du composant
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Liste des produits</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={openModal}
      >
        + Ajouter un produit
      </button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Prix: ${product.price}</p>
            <p>Stock: {product.stock}</p>

            <button
              className="bg-yellow-500 text-white px-4 py-2 mt-2 rounded"
              onClick={() => {
                setSelectedProduct(product); // Sélectionner le produit à modifier
                openModal(); // Ouvrir le modal pour modifier
              }}
            >
              Modifier
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2"
              onClick={() => deleteProduct(product.id!)} // Supprimer
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Modal pour le formulaire */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg w-1/3">
            <ProductForm
              product={selectedProduct ?? undefined}
              onSuccess={handleSuccess}
            />
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

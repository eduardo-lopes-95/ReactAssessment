import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      const products = await Promise.all(
        favorites.map(async (id) => {
          try {
            const response = await axios.get(
              `https://dummyjson.com/products/${id}`
            );
            return response.data;
          } catch (error) {
            console.error("Erro ao buscar produto:", error);
            return null;
          }
        })
      );
      setFavoriteProducts(products.filter((product) => product !== null));
    };

    if (favorites.length > 0) {
      fetchFavoriteProducts();
    }
  }, [favorites]);

  return (
    <div className="flex flex-col p-8 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Produtos Favoritos</h1>
      <ul>
        {favoriteProducts.length === 0 ? (
          <p className="text-center text-red-500">Nenhum produto favorito encontrado.</p>
        ) : (
          favoriteProducts.map((product) => (
            <li key={product.id} className="p-4 bg-gray-200 rounded-lg mb-4 flex items-center hover:bg-gray-300 transition duration-300">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <p className="text-lg font-medium text-gray-700">{product.title}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Favorites;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  padding: 1rem;
  background-color: #ecf0f1;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dfe6e9;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

const ProductDetails = styled.div`
  flex-grow: 1;
`;

const ProductTitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin: 0;
`;

const NoFavoritesMessage = styled.p`
  text-align: center;
  color: #e74c3c;
  font-size: 1rem;
`;

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
    <PageContainer>
      <Title>Produtos Favoritos</Title>
      <ProductList>
        {favoriteProducts.length === 0 ? (
          <NoFavoritesMessage>
            Nenhum produto favorito encontrado.
          </NoFavoritesMessage>
        ) : (
          favoriteProducts.map((product) => (
            <ProductItem key={product.id}>
              <ProductImage src={product.images[0]} alt={product.title} />
              <ProductDetails>
                <ProductTitle>{product.title}</ProductTitle>
              </ProductDetails>
            </ProductItem>
          ))
        )}
      </ProductList>
    </PageContainer>
  );
};

export default Favorites;

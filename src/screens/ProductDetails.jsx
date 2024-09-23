import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://api-infnet-produtos-privado.vercel.app/produtos/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const mappedProduct = {
          id: response.data._id,
          nome: response.data.nome,
          preco: response.data.preco,
          fornecedor: response.data.fornecedor,
          url_imagem: response.data.url_imagem,
          descricao: response.data.descricao, 
        };

        setProduct(mappedProduct);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl text-gray-800 mb-2">{product.nome}</h1>
      <div className="text-gray-700 text-lg mb-5 rich-text" dangerouslySetInnerHTML={{ __html: product.descricao }} />
      <p className="font-bold text-2xl text-red-600 mb-5">Preço: R$ {parseFloat(product.preco).toFixed(2)}</p>
      <p className="font-bold mb-5">Fornecedor: {product.fornecedor}</p>
      <div className="flex flex-wrap justify-center mb-5">
        {product.url_imagem !== "NA" && (
          <img src={product.url_imagem} alt={product.nome} className="w-48 h-auto object-cover mr-2 rounded-lg shadow-sm" />
        )}
      </div>
      <button onClick={() => navigate(`/edit-product/${product.id}`, { state: product })} className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Editar Produto</button>
    </div>
  );
};

export default ProductDetails;

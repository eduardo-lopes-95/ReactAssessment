import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const productFromLocation = location.state;

  const [product, setProduct] = useState({
    title: productFromLocation ? productFromLocation.nome : "",
    description: productFromLocation ? productFromLocation.descricao : "",
    price: productFromLocation ? productFromLocation.preco : "",
    url_imagem: productFromLocation ? productFromLocation.url_imagem : "",
    minimumOrderQuantity: productFromLocation ? productFromLocation.minimumOrderQuantity : 1,
  });

  useEffect(() => {
    if (!productFromLocation) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${id}`);
          const data = await response.json();
          setProduct({
            title: data.nome,
            description: data.descricao,
            price: data.preco,
            url_imagem: data.url_imagem,
            minimumOrderQuantity: data.minimumOrderQuantity,
          });
        } catch (error) {
          console.error("Erro ao buscar detalhes do produto:", error);
        }
      };

      fetchProductDetails();
    }
  }, [id, productFromLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://api-infnet-produtos-privado.vercel.app/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: product.title,
          preco: parseFloat(product.price),
          fornecedor: product.fornecedor,
          url_imagem: product.url_imagem,
          descricao: product.description,
        }),
      });
      const result = await response.json();
      toast.success("Produto atualizado com sucesso!");
      console.log(result);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      toast.error("Erro ao atualizar produto.");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl text-gray-800 mb-5">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="font-bold">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="description" className="font-bold">Descrição:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="price" className="font-bold">Preço:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="minimumOrderQuantity" className="font-bold">Quantidade Mínima de Pedido:</label>
        <input
          type="number"
          id="minimumOrderQuantity"
          name="minimumOrderQuantity"
          value={product.minimumOrderQuantity}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="url_imagem" className="font-bold">URL da Imagem:</label>
        <input
          type="text"
          id="url_imagem"
          name="url_imagem"
          value={product.url_imagem}
          onChange={handleChange}
          required
          className="p-2 border border-gray-300 rounded"
        />

        <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Atualizar Produto</button>
      </form>
    </div>
  );
};

export default EditProduct;

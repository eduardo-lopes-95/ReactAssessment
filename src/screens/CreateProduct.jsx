import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RichText from "../components/RichText"; 

const CreateProduct = () => {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState("");
  const [url_imagem, setUrlImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://api-infnet-produtos-privado.vercel.app/fornecedores",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        toast.error("Erro ao buscar fornecedores.");
      }
    };

    fetchFornecedores();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!nome) {
      newErrors.nome = "Por favor, insira o nome do produto.";
    }

    if (!preco) {
      newErrors.preco = "O preço é obrigatório.";
    } else if (isNaN(preco) || parseFloat(preco) <= 0) {
      newErrors.preco = "O preço deve ser um número positivo.";
    }

    if (!url_imagem || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url_imagem)) {
      newErrors.url_imagem = "A URL da imagem deve ser um link válido (ex: http://exemplo.com/imagem.jpg).";
    }

    if (!descricao) {
      newErrors.descricao = "A descrição é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://api-infnet-produtos-privado.vercel.app/produtos",
        {
          nome,
          preco: parseFloat(preco),
          fornecedor: fornecedorId,
          url_imagem,
          descricao,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Produto criado com sucesso!");
      navigate("/products");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Erro ao criar produto.");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl text-gray-800 mb-5">Criar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Nome do Produto:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={`w-full p-2 border ${errors.nome ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Preço:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className={`w-full p-2 border ${errors.preco ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.preco && <p className="text-red-500 text-sm">{errors.preco}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Fornecedor:</label>
          <select
            value={fornecedorId}
            onChange={(e) => setFornecedorId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor._id} value={fornecedor._id}>
                {fornecedor.nome}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">URL da Imagem:</label>
          <input
            type="text"
            value={url_imagem}
            onChange={(e) => setUrlImagem(e.target.value)}
            className={`w-full p-2 border ${errors.url_imagem ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.url_imagem && <p className="text-red-500 text-sm">{errors.url_imagem}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Descrição:</label>
          <RichText
            value={descricao}
            onChange={setDescricao}
            className={`w-full p-2 border ${errors.descricao ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao}</p>}
        </div>
        
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Criar Produto
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateSupplier = () => {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://api-infnet-produtos-privado.vercel.app/fornecedores",
        { nome },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      toast.success("Fornecedor criado com sucesso!");
      navigate("/suppliers"); 
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      toast.error("Erro ao criar fornecedor.");
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Criar Fornecedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nome do Fornecedor:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Criar Fornecedor
        </button>
      </form>
    </div>
  );
};

export default CreateSupplier;

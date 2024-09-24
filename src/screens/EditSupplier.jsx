import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [supplier, setSupplier] = useState({
    nome: "", 
  });


  useEffect(() => {
    if (location.state && location.state.supplier) {
      setSupplier(location.state.supplier);
    }
  }, [location.state]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const body = {
        nome: supplier.nome,
      };
      await axios.put(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${id}`, body, {
        headers: { Authorization: `${token}` },
      });
      toast.success("Fornecedor atualizado com sucesso!");
      navigate("/suppliers");
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      toast.error("Erro ao atualizar fornecedor.");
    }
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Editar Fornecedor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nome do Fornecedor:</label>
          <input
            type="text"
            name="nome"
            value={supplier.nome}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Atualizar Fornecedor
        </button>
      </form>
    </div>
  );
};

export default EditSupplier;

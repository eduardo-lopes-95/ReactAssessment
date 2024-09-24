import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import SupplierModal from "../components/SupplierModal"; 

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null); 
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://api-infnet-produtos-privado.vercel.app/fornecedores", {
          headers: { Authorization: `${token}` },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        toast.error("Erro ao buscar fornecedores.");
      }
    };

    fetchSuppliers();
  }, []);

  const openConfirmationModal = (supplier) => {
    setSupplierToDelete(supplier);
    setIsConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSupplierToDelete(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${supplierToDelete._id}`, {
        headers: { Authorization: `${token}` },
      });
      setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierToDelete._id));
      closeConfirmationModal();
      toast.success("Fornecedor excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
      toast.error("Erro ao excluir fornecedor.");
    }
  };

  const handleEditSupplier = (supplier) => {
    navigate(`/edit-supplier/${supplier._id}`, { state: { supplier } });
  };

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier); 
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">Lista de Fornecedores</h1>
      <Link to="/create-supplier" className="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Adicionar Fornecedor
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Nome do Fornecedor</th>
              <th className="py-2 px-4 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{supplier.nome}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleViewSupplier(supplier)} className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2">
                    Visualizar
                  </button>
                  <button onClick={() => handleEditSupplier(supplier)} className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
                    Editar
                  </button>
                  <button onClick={() => openConfirmationModal(supplier)} className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal isOpen={isConfirmationModalOpen} onClose={closeConfirmationModal} onConfirm={handleDelete} />
      <SupplierModal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)} supplier={selectedSupplier} />
    </div>
  );
};

export default Suppliers;

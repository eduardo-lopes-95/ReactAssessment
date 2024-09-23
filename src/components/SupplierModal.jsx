import React from "react";

const SupplierModal = ({ isOpen, onClose, supplier }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detalhes do Fornecedor</h2>
        <p><strong>Nome:</strong> {supplier.nome}</p>
        <div className="mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;

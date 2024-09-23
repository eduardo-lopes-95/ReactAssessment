import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-bold">Confirmar Exclusão</h2>
        <p className="mb-4">Você tem certeza que deseja excluir este produto?</p>
        <button
          onClick={onConfirm}
          className="mx-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Confirmar
        </button>
        <button
          onClick={onClose}
          className="mx-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;

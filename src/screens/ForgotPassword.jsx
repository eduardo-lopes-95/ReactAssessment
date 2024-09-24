import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Um link de redefinição de senha foi enviado para ${email}`);
    setEmail("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recuperação de Senha</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Enviar Link de Redefinição
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

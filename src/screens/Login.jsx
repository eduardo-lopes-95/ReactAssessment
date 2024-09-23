import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api-infnet-produtos-privado.vercel.app/auth",
        {
          email: username,
          password: password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        login();
        toast.success("Login realizado com sucesso!");
        navigate("/home");
      } else {
        setError("Nome de usuário ou senha incorretos.");
        toast.error("Nome de usuário ou senha incorretos.");
      }
    } catch (error) {
      setError("Erro na autenticação.");
      toast.error("Erro na autenticação.");
    }
  };

  const handleRegister = () => {
    navigate("/registerform");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl text-center text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Nome de usuário:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded mb-2 hover:bg-blue-600"
        >
          Entrar
        </button>
        <p
          onClick={handleForgotPassword}
          className="cursor-pointer text-blue-500"
        >
          Esqueceu a senha?
        </p>
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}

export default Login;

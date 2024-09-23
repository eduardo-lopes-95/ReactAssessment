import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    setStatus("loading");
    toast.info("Enviando dados...");

    setTimeout(() => {
      if (Math.random() > 0.5) {
        setStatus("success");
        toast.success(
          "Registro realizado com sucesso! Redirecionando para o login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("error");
        toast.error("Erro ao registrar. Por favor, tente novamente.");
      }
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-md font-sans">
      <h2 className="text-2xl text-gray-800 mb-6 text-center">
        Registro de Usuário
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4">
          <label htmlFor="name" className="text-sm mb-1 text-gray-700">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            {...register("name", { required: "Nome é obrigatório" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm mb-1 text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            {...register("email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm mb-1 text-gray-700">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            {...register("password", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Registrar"}
        </button>
        {status === "success" && (
          <p className="mt-4 p-2 bg-green-500 text-white text-center font-bold rounded">
            Registro realizado com sucesso! Redirecionando para o login...
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 p-2 bg-red-500 text-white text-center font-bold rounded">
            Erro ao registrar. Por favor, tente novamente.
          </p>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;

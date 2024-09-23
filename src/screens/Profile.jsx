import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeContext";

const Profile = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [userData, setUserData] = useState({});
  const { userId } = useParams();
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    axios
      .get(`https://api.example.com/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setValue("name", response.data.name);
        setValue("email", response.data.email);
        setValue("lastName", response.data.lastName);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId, setValue]);

  const onSubmit = (data) => {
    fetch(`https://dummyjson.com/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.success("Usuário atualizado com sucesso!");
        console.log(response);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast.error("Erro ao atualizar usuário.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-gray-100 font-sans text-gray-800 rounded-lg shadow-md">
      <label className="flex items-center cursor-pointer mb-5">
        <input type="checkbox" onChange={toggleTheme} className="hidden" />
        <span className="relative w-12 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out">
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out"></span>
        </span>
        <span className="ml-2">Alterar tema</span>
      </label>
      <h1 className="text-2xl font-bold">Página de Perfil</h1>
      <div className="mb-5 text-left">
        <p>
          <strong>Nome:</strong> {userData.name}
        </p>
        <p>
          <strong>Sobrenome:</strong> {userData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label htmlFor="name" className="font-bold">
          Nome:
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="lastName" className="font-bold">
          Sobrenome:
        </label>
        <input
          {...register("lastName")}
          id="lastName"
          type="text"
          className="p-2 border border-gray-300 rounded"
        />

        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Atualizar Perfil
        </button>
      </form>
    </div>
  );
};

export default Profile;

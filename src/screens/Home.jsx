import React from "react";
import NavMenu from "../components/NavMenu";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavMenu />
      <main className="flex flex-1">
        <div className="max-w-2xl mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow">
          <h1 className="text-3xl text-gray-800 mb-6 text-center">
            Bem-vindo ao Nosso E-commerce!
          </h1>
          <p className="text-lg leading-6 mb-8 text-center">
            Olá, usuário! É um prazer tê-lo aqui. Explore nossos produtos e
            aproveite as melhores ofertas.
          </p>
          <ul className="list-none p-0 my-6">
            <li className="text-lg mb-2 p-2 bg-gray-200 rounded transition duration-300 hover:bg-gray-300">
              Acesse suas informações pessoais
            </li>
            <li className="text-lg mb-2 p-2 bg-gray-200 rounded transition duration-300 hover:bg-gray-300">
              Verifique suas notificações
            </li>
            <li className="text-lg mb-2 p-2 bg-gray-200 rounded transition duration-300 hover:bg-gray-300">
              Explore nossas categorias de produtos
            </li>
            <li className="text-lg mb-2 p-2 bg-gray-200 rounded transition duration-300 hover:bg-gray-300">
              Fique por dentro das promoções e novidades
            </li>
          </ul>
          <a
            href="/products"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded transition duration-300 hover:bg-blue-700 mt-5"
          >
            Comece a Explorar!
          </a>
        </div>
      </main>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTh, FaList } from "react-icons/fa";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [skip, setSkip] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const productsResponse = await axios.get(
          `https://api-infnet-produtos-privado.vercel.app/produtos`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setProducts((prevProducts) => [...prevProducts, ...productsResponse.data]);

        const fornecedoresResponse = await axios.get(
          `https://api-infnet-produtos-privado.vercel.app/fornecedores`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setFornecedores(fornecedoresResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [skip]);

  const toggleFavorite = (product) => {
    const updatedFavorites = favorites.includes(product._id)
      ? favorites.filter((id) => id !== product._id)
      : [...favorites, product._id];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const openModal = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(
        `https://api-infnet-produtos-privado.vercel.app/produtos/${productToDelete._id}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      setProducts(products.filter((product) => product._id !== productToDelete._id));
      closeModal();
      toast.success("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      toast.error("Erro ao excluir produto.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFornecedor = selectedFornecedor ? product.fornecedor === selectedFornecedor : true;
    return matchesSearchTerm && matchesFornecedor;
  });

  return (
    <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg">
      <h1 className="font-roboto text-2xl font-bold text-gray-800 mb-5">
        Catálogo de Produtos
      </h1>
      <div className="flex justify-between mb-5">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 text-base border border-gray-300 rounded-lg shadow-sm"
        />

        <select
          value={selectedFornecedor}
          onChange={(e) => setSelectedFornecedor(e.target.value)}
          className="ml-4 p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Todos os Fornecedores</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor._id} value={fornecedor.nome}>
              {fornecedor.nome}
            </option>
          ))}
        </select>

        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="ml-4 p-2 bg-blue-600 text-white rounded-lg"
        >
          {viewMode === "grid" ? <FaList /> : <FaTh />}
        </button>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5"
            : "flex flex-col"
        }
      >
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className={
              viewMode === "grid"
                ? "bg-white border border-gray-300 rounded-lg overflow-hidden transition-transform duration-200 hover:transform hover:translate-y-1 hover:shadow-lg"
                : "bg-white border border-gray-300 rounded-lg p-4 mb-4"
            }
          >
            <Link
              to={`/products/${product._id}`}
              className={viewMode === "list" ? "flex" : ""}
            >
              {viewMode === "grid" && (
                <img
                  src={product.url_imagem}
                  alt={product.nome}
                  className="w-full h-44 object-contain bg-gray-100 p-3"
                />
              )}
              <div className={viewMode === "list" ? "ml-4" : "p-4"}>
                <h2 className="text-base font-medium text-gray-700 truncate mb-2">
                  {product.nome}
                </h2>
                <p className="text-sm text-gray-500 line-through">
                  R$ {parseFloat(product.preco).toFixed(2)}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  R$ {(parseFloat(product.preco) * 0.8).toFixed(2)}
                </p>
                <p className="text-sm text-green-600 font-bold mt-2">
                  Frete grátis
                </p>
              </div>
            </Link>

            <button
              onClick={() => toggleFavorite(product)}
              className="bg-blue-600 text-white rounded-lg py-2 px-3 text-sm mt-4 mx-auto block hover:bg-blue-700 mb-4"
            >
              <i
                className={favorites.includes(product._id) ? "fas fa-heart" : "far fa-heart"}
              ></i>{" "}
              {favorites.includes(product._id) ? "Favorito" : "Adicionar aos Favoritos"}
            </button>
            <button
              onClick={() => openModal(product)}
              className="bg-red-600 text-white rounded-lg py-2 px-3 text-sm mt-4 mx-auto block hover:bg-red-700 mb-4"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSkip(skip + 10)}
        className="bg-blue-600 text-white rounded-lg py-3 px-6 mt-8 mx-auto block hover:bg-blue-700"
      >
        Carregar Mais
      </button>

      <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} />
    </div>
  );
};

export default Products;

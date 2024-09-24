import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBox,
  FaHeart,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaListAlt,
} from "react-icons/fa";
import AuthContext from "../contexts/AuthContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div
      className={`h-screen ${
        expanded ? "w-52" : "w-16"
      } bg-gray-800 transition-width flex flex-col items-center pt-5`}
    >
      <FaBars
        className="text-white text-2xl mb-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      />

      <Link
        to="/home"
        className="w-full p-4 text-white text-lg flex items-center justify-center hover:bg-gray-700 border-b border-gray-600"
      >
        <FaHome className="mr-2" />
        {expanded && <span>Home</span>}
      </Link>
      <Link
        to="/profile"
        className="w-full p-4 text-white text-lg flex items-center justify-center hover:bg-gray-700 border-b border-gray-600"
      >
        <FaUser className="mr-2" />
        {expanded && <span>Profile</span>}
      </Link>

      <div className="w-full">
        <div
          className="w-full p-4 text-white text-lg flex items-center justify-between hover:bg-gray-700 border-b border-gray-600 cursor-pointer"
          onClick={() => setIsProductsOpen(!isProductsOpen)}
        >
          <div className="flex items-center">
            <FaListAlt  className="mr-2" />
            {expanded && <span>Produtos</span>}
          </div>
          {expanded && (
            <span className="text-gray-400">
              {isProductsOpen ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </div>

        {isProductsOpen && (
          <div className="w-full pl-8">
            <Link
              to="/products"
              className="w-full p-4 text-white text-md flex items-center hover:bg-gray-700 border-b border-gray-600"
            >
              <FaListAlt className="mr-2" />
              <span>Lista</span>
            </Link>
            <Link
              to="/create-product"
              className="w-full p-4 text-white text-md flex items-center hover:bg-gray-700 border-b border-gray-600"
            >
              <FaPlus className="mr-2" />
              <span>Criar Produto</span>
            </Link>
            <Link
              to="/suppliers"
              className="w-full p-4 text-white text-md flex items-center hover:bg-gray-700 border-b border-gray-600"
            >
              <FaBox className="mr-2" /> 
              <span>Fornecedores</span>
            </Link>
            <Link
              to="/favorites"
              className="w-full p-4 text-white text-md flex items-center hover:bg-gray-700 border-b border-gray-600"
            >
              <FaHeart className="mr-2" />
              <span>Favoritos</span>
            </Link>
          </div>
        )}
      </div>

      <div
        onClick={handleLogout}
        className="w-full p-4 text-white text-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer border-b border-gray-600"
      >
        <FaSignOutAlt className="mr-2" />
        {expanded && <span>Logout</span>}
      </div>
    </div>
  );
};

export default Sidebar;

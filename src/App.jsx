import "./styles.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import CreateProduct from "./screens/CreateProduct";
import RegisterForm from "./forms/RegisterForm";
import Products from "./screens/Products";
import ProductDetails from "./screens/ProductDetails";
import Favorites from "./screens/Favorites";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./screens/Profile";
import Suppliers from "./screens/Suppliers";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import ForgotPassword from "./screens/ForgotPassword";
import EditProduct from "./screens/EditProduct";
import CreateSupplier from "./screens/CreateSupplier";
import EditSupplier from "./screens/EditSupplier";

const App = () => {
  const location = useLocation();
  const showSidebar = [
    "/home",
    "/profile",
    "/products",
    "/favorites",
    "/create-product",
    "/suppliers",
    "/create-supplier",
  ].some((path) => location.pathname.startsWith(path)) ||
    ["/products/", "/edit-product/", "/edit-supplier/"].some((dynamicPath) =>
      location.pathname.match(new RegExp(`^${dynamicPath}`))
    );
  

  return (
    <div style={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registerform" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/create-supplier" element={<CreateSupplier />} />
            <Route path="/edit-supplier/:id" element={<EditSupplier />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
};

function Main() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}

export default Main;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/admin/Products";
import UpdateProducts from "./pages/admin/UpdateProducts";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "71vh" }}>
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                description="description"
                keywords="keywords"
                author="author"
                title="E-Commerce"
              />
            }
          />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route
            path="/about"
            element={
              <About
                description="description"
                keywords="keywords"
                author="author"
                title="About Page"
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                description="description"
                keywords="keywords"
                author="author"
                title="Contact Page"
              />
            }
          />
          <Route
            path="/policy"
            element={
              <Policy
                description="description"
                keywords="keywords"
                author="author"
                title="Policy Policy"
              />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route
              path="admin/update-product/:slug"
              element={<UpdateProducts />}
            />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

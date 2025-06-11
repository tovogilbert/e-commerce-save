import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./Index";
import "./assets/styles/Layout.css";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import ProductListPage from "./pages/admin/product/List";
import CartPage from "./pages/cart/CartPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/List" element={<ProductListPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

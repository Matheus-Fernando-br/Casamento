// src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Presentes from "../pages/Presentes";
import Carrinho from "../pages/Carrinho";
import Pix from "../pages/Pix";
import ComoFunciona from "../pages/ComoFunciona";
import ScrollToTop from "../components/ScrollToTop"

export default function AppRoutes() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pix" element={<Pix />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
      </Routes>
    </BrowserRouter>
  );
}
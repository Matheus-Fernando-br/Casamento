import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Navbar() {
  const { cart } = useCart();
  const [menuAberto, setMenuAberto] = useState(false);
  function fecharMenu() {
    setMenuAberto(false);
  }
  return (
    <header className="navbar">
      {" "}
      {/* MENU HAMBÚRGUER */}{" "}
      <button
        type="button"
        className={`menu-toggle ${menuAberto ? "aberto" : ""}`}
        onClick={() => setMenuAberto((estado) => !estado)}
        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuAberto}
      >
        {" "}
        <span></span> <span></span> <span></span>{" "}
      </button>{" "}
      {/* LOGO */}{" "}
      <NavLink to="/" className="logo" onClick={fecharMenu}>
        {" "}
        Matheus & Kariny 💍{" "}
      </NavLink>{" "}
      {/* CARRINHO */}{" "}
      <NavLink
        to="/carrinho"
        className={({ isActive }) => `cart-link ${isActive ? "active" : ""}`}
        onClick={fecharMenu}
      >
        {" "}
        <i className="bi bi-cart3"></i> <span>Carrinho</span>{" "}
        <strong className="cart-count">{cart.length}</strong>{" "}
      </NavLink>{" "}
      {/* MENU */}{" "}
      <nav className={`navbar-menu ${menuAberto ? "aberto" : ""}`}>
        {" "}
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={fecharMenu}
        >
          {" "}
          Início{" "}
        </NavLink>{" "}
        <NavLink
          to="/presentes"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={fecharMenu}
        >
          {" "}
          Presentes{" "}
        </NavLink>{" "}
        <NavLink
          to="/como-funciona"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={fecharMenu}
        >
          {" "}
          Como funciona{" "}
        </NavLink>{" "}
        <NavLink
          to="/presenca"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={fecharMenu}
        >
          {" "}
          Confirmação de Presença{" "}
        </NavLink>{" "}
        <NavLink
          to="/local"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={fecharMenu}
        >
          {" "}
          Local{" "}
        </NavLink>{" "}
      </nav>{" "}
    </header>
  );
}

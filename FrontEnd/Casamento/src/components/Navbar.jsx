import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Navbar() {
  const { cart } = useCart();
  const [menuAberto, setMenuAberto] = useState(false);
  function fecharMenu() {
    setMenuAberto(false);
  }
  function alternarMenu() {
    setMenuAberto((estado) => !estado);
  }
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        fecharMenu();
      }
    }
    if (menuAberto) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuAberto]);
  useEffect(() => {
    if (menuAberto) {
      document.body.classList.add("menu-aberto");
    } else {
      document.body.classList.remove("menu-aberto");
    }
    return () => {
      document.body.classList.remove("menu-aberto");
    };
  }, [menuAberto]);
  return (
    <>
      {" "}
      {/* FUNDO ESCURECIDO */}{" "}
      <div
        className={`navbar-overlay ${menuAberto ? "visivel" : ""}`}
        onClick={fecharMenu}
        aria-hidden="true"
      />{" "}
      <header className="navbar">
        {" "}
        {/* MENU HAMBÚRGUER */}{" "}
        <button
          type="button"
          className={`menu-toggle ${menuAberto ? "aberto" : ""}`}
          onClick={alternarMenu}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {" "}
          <span></span> <span></span> <span></span>{" "}
        </button>{" "}
        {/* LOGO */}{" "}
        <NavLink
          to="/"
          className="logo"
          onClick={fecharMenu}
          aria-label="Ir para a página inicial"
        >
          {" "}
          Matheus &amp; Kariny{" "}
        </NavLink>{" "}
        {/* CARRINHO */}{" "}
        <NavLink
          to="/carrinho"
          className={({ isActive }) => `cart-link ${isActive ? "active" : ""}`}
          onClick={fecharMenu}
        >
          {" "}
          <i className="bi bi-cart3"></i>
          <strong className="cart-count"> {cart.length} </strong>{" "}
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
            Ver Lista de Presentes{" "}
          </NavLink>{" "}
          {/* <NavLink to="/presenca" className={({ isActive }) => isActive ? "active" : "" } onClick={fecharMenu} > Confirmação de Presença </NavLink> <NavLink to="/local" className={({ isActive }) => isActive ? "active" : "" } onClick={fecharMenu} > Local </NavLink> */}{" "}
          <NavLink
            to="/cha"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={fecharMenu}
          >
            {" "}
            Chá de Casa Nova{" "}
          </NavLink>{" "}
        </nav>{" "}
      </header>{" "}
    </>
  );
}

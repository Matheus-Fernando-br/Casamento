// src/components/Navbar.jsx

import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <div className="navbar">
      <div className="logo">Matheus & Kariny 💍</div>

      <div className="menu">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Início
        </NavLink>

        <NavLink
          to="/presentes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Presentes
        </NavLink>

        <NavLink
          to="/como-funciona"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Como funciona
        </NavLink>

        <NavLink
          to="/local"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Local
        </NavLink>
      </div>

       <div className="cart">
        <NavLink 
          to="/carrinho"
          className={({ isActive }) => isActive ? "active" : ""}
        >
          <i className="bi bi-cart"></i>

          <span className="cart-count">
            {cart.length}
          </span>
        </NavLink>
      </div>

    </div>

  )
}
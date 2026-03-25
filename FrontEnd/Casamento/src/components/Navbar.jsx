// src/components/Navbar.jsx

import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

export default function Navbar(){

  const { cart } = useCart()

  return(

    <div className="navbar">

      <div className="logo">

        Matheus & Kariny 💍

      </div>

      <div className="menu">

        <Link to="/">Inicio</Link>

        <Link to="/presentes">Presentes</Link>

        <Link to="/como-funciona">Como funciona</Link>
      </div>

        <div className="cart">

          <Link to="/carrinho">

            <i className="bi bi-cart"></i>

            <span className="cart-count">

              {cart.length}

            </span>

          </Link>
        </div>

    </div>

  )

}
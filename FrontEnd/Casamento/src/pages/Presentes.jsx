import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import Container from "../components/Container";
import FrasePix from "../components/FrasePix";

import { categorias } from "../data/presentes";
import { useCart } from "../context/CartContext";

export default function Presentes() {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [showTop, setShowTop] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  function handleAdd(item) {
    addToCart(item);

    setShowMsg(true);

    setTimeout(() => {
      setShowMsg(false);
    }, 2000);
  }

  function scrollToCategoria(id) {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  useEffect(() => {
    function handleScroll() {
      setShowTop(window.scrollY > 400);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <BotaoVoltar />

      <Container>
        {/* ================================
            CABEÇALHO
        ================================= */}

        <div className="presentes-header">
          <h1>
            Lista de presentes <span>🎁</span>
          </h1>

          <p>
            Escolha um presente para fazer parte
            <br />
            desse novo capítulo da nossa história. 💖
          </p>
        </div>

        {/* ================================
            DIVISOR
        ================================= */}

        <div className="ou-divider">
          <span></span>

          <strong>ou</strong>

          <span></span>
        </div>

        {/* ================================
            PIX
        ================================= */}

        <FrasePix />

        {/* ================================
            FILTRO DE CATEGORIAS
        ================================= */}

        <div className="categoria-filtro">
          <p>Escolha a categoria</p>

          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              onClick={() => scrollToCategoria(categoria.id)}
            >
              {categoria.titulo}
            </button>
          ))}
        </div>

        {/* ================================
            CARRINHO
        ================================= */}

        <div
          style={{
            textAlign: "center",
            marginTop: 50,
          }}
        >
          <button
            className="pix-btn"
            type="button"
            onClick={() => navigate("/carrinho")}
          >
            Ir para o carrinho
            <i className="bi bi-cart3"></i>{" "}
          </button>
        </div>

        {/* ================================
            CATEGORIAS / PRESENTES
        ================================= */}

        {categorias.map((categoria) => (
          <section id={categoria.id} className="section" key={categoria.id}>
            <h2 className="section-title">{categoria.titulo}</h2>

            <div className="grid-presentes">
              {categoria.itens.map((item) => (
                <div className="card-presente" key={item.id}>
                  <img src={item.imagem} alt={item.nome} />

                  <h3>{item.nome}</h3>

                  <p>{item.descricao}</p>

                  <span>R$ {item.preco.toLocaleString("pt-BR")},00</span>

                  <button type="button" onClick={() => handleAdd(item)}>
                    Adicionar
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Container>

      {/* ================================
          BOTÕES FLUTUANTES
      ================================= */}

      {showTop && (
        <div className="floating-actions">
          {" "}
          {/* IR PARA O CARRINHO */}{" "}
          <NavLink
            to="/carrinho"
            className="floating-cart"
            aria-label="Ir para o carrinho"
          >
            {" "}
            <i className="bi bi-cart3"></i>{" "}
            <strong className="floating-cart-count">
              {" "}
              {cart.length}{" "}
            </strong>{" "}
          </NavLink>{" "}
          {/* VOLTAR AO TOPO */}{" "}
          <button
            className="scroll-top"
            type="button"
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {" "}
            ↑{" "}
          </button>{" "}
        </div>
      )}

      {/* ================================
          ALERTA DO CARRINHO
      ================================= */}

      {showMsg && (
        <div className="cart-alert">Presente adicionado ao carrinho 💖</div>
      )}
    </>
  );
}

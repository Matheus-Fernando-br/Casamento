import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import { categorias } from "../data/presentes";
import { useCart } from "../context/CartContext";

export default function Presentes() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
      });
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      <BotaoVoltar />

      <div style={{ marginTop: 40, textAlign: "center" }}>
        <h1>Lista de presentes 🎁</h1>

        <p>Escolha um presente para abençoar nosso casamento 💖</p>
      </div>

      <div className="categoria-filtro">
        <p>Escolha a categoria</p>

        <button onClick={() => scrollToCategoria("essenciais")}>
          Essenciais da casa
        </button>

        <button onClick={() => scrollToCategoria("sala")}>Sala</button>

        <button onClick={() => scrollToCategoria("quarto")}>Quarto</button>

        <button onClick={() => scrollToCategoria("cozinha")}>Cozinha</button>

        <button onClick={() => scrollToCategoria("limpeza")}>Limpeza</button>

        <button onClick={() => scrollToCategoria("extras")}>Extras</button>
      </div>

      <div style={{ textAlign: "center", marginTop: 50 }}>
        <button
          className="pix-btn"
          style={{ background: "green" }}
          onClick={() => navigate("/carrinho")}
        >
          Ir para o carrinho
        </button>
      </div>

      {categorias.map((categoria) => (
        <div id={categoria.id} className="section" key={categoria.id}>
          <h2 className="section-title">{categoria.titulo}</h2>

          <div className="grid-presentes">
            {categoria.itens.map((item) => (
              <div className="card-presente" key={item.id}>
                <img src={item.imagem} />

                <h3>{item.nome}</h3>

                <p>{item.descricao}</p>

                <span>R$ {item.preco},00</span>

                <button onClick={() => handleAdd(item)}>Adicionar</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showTop && (
        <button
          className="scroll-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑
        </button>
      )}

      {/* ALERT PREMIUM */}

      {showMsg && (
        <div className="cart-alert">Presente adicionado ao carrinho 💖</div>
      )}
    </>
  );
}

// src/components/CardPresente.jsx

import { useCart } from "../context/CartContext";

export default function CardPresente({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={item.imagem} />

      <h3>{item.nome}</h3>

      <p>{item.descricao}</p>

      <span style={{ color: "green" }}>R$ {item.preco}</span>

      <button onClick={() => addToCart(item)}>adicionar</button>
    </div>
  );
}

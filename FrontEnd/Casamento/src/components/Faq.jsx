import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import { useState } from "react";

// Componente extraído para FORA de Faq
function Item({ index, pergunta, resposta, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => onToggle(index)}>
        <h3>{pergunta}</h3>

        <i
          className={
            isOpen
              ? "bi bi-arrow-right-square-fill icon rotate"
              : "bi bi-arrow-right-square-fill icon"
          }
        ></i>
      </div>

      <div className={isOpen ? "faq-answer open" : "faq-answer"}>
        <p>{resposta}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(null);

  function toggle(index) {
    setOpen(open === index ? null : index);
  }

  return (
    <>
      <Navbar />

      <BotaoVoltar />

      <div className="faq">
        <div style={{ marginBottom: 40, lineHeight: 2 }}>
          <h1>Como funciona ❓</h1>

          <p>Veja abaixo as principais dúvidas sobre os presentes.</p>
        </div>

        <Item
          index={1}
          pergunta="Preciso criar conta?"
          resposta="Não. O processo é simples e rápido, sem necessidade de cadastro."
          isOpen={open === 1}
          onToggle={toggle}
        />

        <Item
          index={2}
          pergunta="Como envio o presente?"
          resposta="Escolha o presente desejado, copie a chave PIX e envie o valor."
          isOpen={open === 2}
          onToggle={toggle}
        />

        <Item
          index={3}
          pergunta="Posso escolher mais de um presente?"
          resposta="Sim, você pode escolher quantos presentes desejar abençoar."
          isOpen={open === 3}
          onToggle={toggle}
        />

        <Item
          index={4}
          pergunta="Posso enviar qualquer valor?"
          resposta="Sim, qualquer valor doado será muito bem aceito, desde que venha do coração!"
          isOpen={open === 4}
          onToggle={toggle}
        />
      </div>
    </>
  );
}

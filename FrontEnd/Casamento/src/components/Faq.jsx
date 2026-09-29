import { useState } from "react";

function Item({ index, pergunta, resposta, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-question"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3>{pergunta}</h3>
        <i
          className={`bi bi-arrow-right-short icon ${isOpen ? "rotate" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`faq-answer ${isOpen ? "open" : ""}`}
      >
        <p>{resposta}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(null);
  const toggle = (index) =>
    setOpen((current) => (current === index ? null : index));
  const perguntas = [
    [
      1,
      "Preciso criar conta?",
      "Não. O processo é simples e rápido, sem necessidade de cadastro.",
    ],
    [
      2,
      "Como envio o presente?",
      "Escolha o presente desejado, copie a chave PIX e envie o valor.",
    ],
    [
      3,
      "Posso escolher mais de um presente?",
      "Sim, você pode escolher quantos presentes desejar abençoar.",
    ],
    [
      4,
      "Posso enviar qualquer valor?",
      "Sim, qualquer valor doado será muito bem aceito, desde que venha do coração!",
    ],
  ];
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div>
        <h2 id="faq-title">Como funciona</h2>
        <p>Algumas respostas para tornar esse gesto ainda mais simples.</p>
      </div>
      {perguntas.map(([index, pergunta, resposta]) => (
        <Item
          key={index}
          index={index}
          pergunta={pergunta}
          resposta={resposta}
          isOpen={open === index}
          onToggle={toggle}
        />
      ))}
      <hr className="divider" />
    </section>
  );
}

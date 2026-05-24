import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import { useState } from "react";

export default function Presenca() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <Navbar />

      <BotaoVoltar />

      <div className="faq">
        <div style={{ marginBottom: 40, lineHeight: 2 }}>
          <h1>Confirmação de Presença 📃</h1>

          <p>Confirme sua presença preenchendo os dados abaixo.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <label
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            Nome completo
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome completo do convidado"
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            Telefone
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone para contato"
              required
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </label>

          <button
            type="submit"
            style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
          >
            Confirmar presença
          </button>
        </form>

        {enviado && (
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "#f0f0f0",
            }}
          >
            <strong>Obrigado!</strong>
            <p>Seu contato foi registrado. Aguarde nossa confirmação.</p>
          </div>
        )}
      </div>
    </>
  );
}

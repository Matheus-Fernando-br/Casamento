import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import { useState } from "react";

export default function Presenca() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmar = window.confirm(
      `Confirma os dados?\n\nNome: ${nome}\nTelefone: ${telefone}`,
    );

    if (!confirmar) return;

    try {
      const response = await fetch(
        "https://casamento-rg0q.onrender.com/confirmar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            telefone,
          }),
        },
      );

      const data = await response.json();

      if (data.sucesso) {
        setEnviado(true);
        setNome("");
        setTelefone("");
      }
    } catch (erro) {
      alert("Erro ao enviar confirmação");
    }
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

        <div
          style={{
            background: "#f5f5f5",
            padding: 20,
            borderRadius: 12,
            marginBottom: 30,
            lineHeight: 2,
          }}
        >
          <h2>📍 Informações do Evento</h2>

          <p>🏡 Local: SÍTIO FROIS</p>

          <p>📅 Data: 17/04/2027</p>

          <p>🕖 Horário: 19:00</p>
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
            style={{
              padding: "12px",
              fontSize: "16px",
              cursor: "pointer",
            }}
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
              borderRadius: "12px",
            }}
          >
            <strong>✅ Obrigado!</strong>

            <p>Sua presença foi confirmada com sucesso.</p>
          </div>
        )}

        <div
          style={{
            marginTop: 30,
            background: "#fff3cd",
            padding: 20,
            borderRadius: 12,
            lineHeight: 2,
          }}
        >
          <h3>⚠️ Dados incorretos?</h3>

          <p>
            Entre em contato conosco caso tenha enviado alguma informação
            incorreta ou deseje remover seu nome da lista de convidados.
          </p>
          <a
            href="http://w.me/5531986763652"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "green", fontSize: 40, textAlign: "center" }}
          >
            <i class="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
    </>
  );
}

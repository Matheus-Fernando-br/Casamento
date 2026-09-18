import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";
import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://casamento-rg0q.onrender.com";

function aguardarCincoSegundos() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

export default function Presenca() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmar = window.confirm(
      `Confirma os dados?\n\nNome: ${nome}\nTelefone: ${telefone}`,
    );

    if (!confirmar || enviando) {
      return;
    }

    setEnviando(true);
    setEnviado(false);

    const requisicao = fetch(`${API_URL}/confirmar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome,
        telefone,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Não foi possível enviar a confirmação.");
      }

      return response.json();
    });

    await Promise.allSettled([requisicao, aguardarCincoSegundos()]);

    setEnviando(false);
    setEnviado(true);

    setNome("");
    setTelefone("");
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
              onChange={(event) => setNome(event.target.value)}
              placeholder="Nome completo do convidado"
              required
              disabled={enviando}
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
              onChange={(event) => setTelefone(event.target.value)}
              placeholder="Telefone para contato"
              required
              disabled={enviando}
              style={{ padding: "10px", fontSize: "16px" }}
            />
          </label>

          <button
            type="submit"
            disabled={enviando}
            style={{
              padding: "12px",
              fontSize: "16px",
              cursor: enviando ? "wait" : "pointer",
              opacity: enviando ? 0.7 : 1,
            }}
          >
            {enviando ? (
              <>
                <span className="loading-spinner" />
                Enviando confirmação...
              </>
            ) : (
              "Confirmar presença"
            )}
          </button>
        </form>

        {enviado && (
          <div className="confirmation-success">
            <strong>Presença confirmada com sucesso! ❤️</strong>
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
            href="https://wa.me/5531986763652"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "green", fontSize: 40, textAlign: "center" }}
          >
            <i className="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>
    </>
  );
}

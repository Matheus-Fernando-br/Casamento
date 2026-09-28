import { useState } from "react";
import BotaoVoltar from "../components/BotaoVoltar";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

function aguardarCincoSegundos() {
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

function mascararTelefone(valor) {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 2) {
    return numeros;
  }
  if (numeros.length <= 7) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }
  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}
function formatarNome(valor) {
  return valor.replace(/[^A-Za-zÀ-ÿ\s]/g, "").replace(/\s{2,}/g, " ");
}

export default function Cha() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleNomeChange = (event) => {
    const valor = formatarNome(event.target.value);
    setNome(valor);
  };
  const handleTelefoneChange = (event) => {
    const valor = mascararTelefone(event.target.value);
    setTelefone(valor);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nomeLimpo = nome.trim().replace(/\s+/g, " ");

    const partesNome = nomeLimpo.split(" ").filter(Boolean);
    if (partesNome.length < 2) {
      window.alert("Digite seu nome e sobrenome.");
      return;
    }
    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      window.alert("Digite um telefone válido com DDD.");
      return;
    }
    if (enviando) {
      return;
    }

    const confirmar = window.confirm(
      `Confirma os dados?\n\nNome: ${nome}\nTelefone: ${telefone}`,
    );

    if (!confirmar || enviando) {
      return;
    }

    setEnviando(true);
    setEnviado(false);

    try {
      const requisicao = await fetch(`${API_URL}/confirmar/cha`, {
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
    } catch (error) {
      console.error("Erro ao confirmar presença:", error.message);
      window.alert("Não foi possível confirmar sua presença. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="admin-page">
        <BotaoVoltar />
        <div className="admin-container">
          <div className="admin-card">
            <h1>Chá de Casa Nova</h1>
            <p>Confirme sua presença no chá de casa nova.</p>

            <form className="admin-form" onSubmit={handleSubmit}>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                Nome completo
                <input
                  type="text"
                  value={nome}
                  onChange={handleNomeChange}
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
                  onChange={handleTelefoneChange}
                  placeholder="Telefone para contato"
                  required
                  disabled={enviando}
                  style={{ padding: "10px", fontSize: "16px" }}
                />
              </label>

              <button
                className="admin-button"
                type="submit"
                disabled={enviando}
              >
                {enviando ? "Confirmando..." : "Confirmar Presença"}
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
        </div>
      </main>
    </>
  );
}

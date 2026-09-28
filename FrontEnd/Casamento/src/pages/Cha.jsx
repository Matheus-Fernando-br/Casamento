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
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 7)
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nomeLimpo = nome.trim().replace(/\s+/g, " ");
    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (nomeLimpo.split(" ").filter(Boolean).length < 2) {
      window.alert("Digite seu nome e sobrenome.");
      return;
    }

    if (![10, 11].includes(telefoneNumeros.length)) {
      window.alert("Digite um telefone válido com DDD.");
      return;
    }

    if (enviando) return;

    if (
      !window.confirm(
        `Confirma os dados?\n\nNome: ${nomeLimpo}\nTelefone: ${telefone}`,
      )
    ) {
      return;
    }

    setEnviando(true);
    setEnviado(false);

    try {
      const response = await fetch(`${API_URL}/confirmar/cha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeLimpo, telefone }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.erro || "Não foi possível enviar a confirmação.");
      }

      await aguardarCincoSegundos();
      setEnviado(true);
      setNome("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      window.alert(error.message);
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
            <h1>Chá Revelação</h1>
            <p>Confirme sua presença no chá revelação.</p>

            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                Nome completo
                <input
                  type="text"
                  value={nome}
                  onChange={(event) =>
                    setNome(formatarNome(event.target.value))
                  }
                  placeholder="Nome completo do convidado"
                  required
                  maxLength={150}
                  disabled={enviando}
                />
              </label>

              <label>
                Telefone
                <input
                  type="tel"
                  value={telefone}
                  onChange={(event) =>
                    setTelefone(mascararTelefone(event.target.value))
                  }
                  placeholder="(31) 98765-4321"
                  required
                  disabled={enviando}
                />
              </label>

              <button
                className="admin-button"
                type="submit"
                disabled={enviando}
              >
                {enviando ? "Confirmando..." : "Confirmar presença"}
              </button>
            </form>

            {enviado && (
              <div className="confirmation-success">
                <strong>Presença confirmada com sucesso! ❤️</strong>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

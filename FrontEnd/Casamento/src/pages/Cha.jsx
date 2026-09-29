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
    )
      return;

    setEnviando(true);
    setEnviado(false);

    try {
      const response = await fetch(`${API_URL}/confirmar/cha`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeLimpo, telefone }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(data.erro || "Não foi possível enviar a confirmação.");
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
      <main className="cha-page">
        <BotaoVoltar />
        <div className="cha-container">
          <header className="cha-hero-card">
            <span className="cha-kicker">Um novo capítulo</span>
            <h1>Chá de Casa Nova</h1>
            <p>
              Uma tarde especial para celebrar nosso novo lar ao lado de pessoas
              queridas.
            </p>
          </header>

          <div className="cha-layout">
            <section
              className="cha-card cha-event-card"
              aria-labelledby="cha-event-title"
            >
              <div className="cha-card-heading">
                <span className="cha-icon" aria-hidden="true">
                  ⌂
                </span>
                <div>
                  <span className="cha-kicker">Reserve na agenda</span>
                  <h2 id="cha-event-title">Informações do evento</h2>
                </div>
              </div>
              <div className="cha-event-details">
                <div>
                  <span>Local</span>
                  <strong>Em cima do Teixerão</strong>
                  <p>R. Rosa, 341 — Primavera, Timóteo - MG</p>
                </div>
                <div>
                  <span>Data</span>
                  <strong>16 de janeiro de 2027</strong>
                  <p>Sábado</p>
                </div>
                <div>
                  <span>Horário</span>
                  <strong>16:00</strong>
                  <p>Esperamos você com carinho</p>
                </div>
              </div>
              <div className="cha-map-wrap">
                <iframe
                  title="Mapa do local do Chá de Casa Nova"
                  src="https://www.google.com/maps?q=R.%20Rosa,%20341,%20Primavera,%20Tim%C3%B3teo%20-%20MG&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                className="cha-map-link"
                href="https://www.google.com/maps/search/?api=1&query=R.%20Rosa,%20341,%20Primavera,%20Tim%C3%B3teo%20-%20MG"
                target="_blank"
                rel="noreferrer"
              >
                Abrir no Google Maps <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section
              className="cha-card cha-form-card"
              aria-labelledby="cha-form-title"
            >
              <span className="cha-kicker">Confirme sua presença</span>
              <h2 id="cha-form-title">
                Vai ser muito bom ter você com a gente.
              </h2>
              <p className="cha-form-intro">
                Preencha seus dados para confirmar sua presença no chá.
              </p>
              <form className="admin-form cha-form" onSubmit={handleSubmit}>
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
                  className="admin-button cha-submit-button"
                  type="submit"
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Confirmando...</span>
                    </>
                  ) : (
                    "Confirmar presença"
                  )}
                </button>
              </form>
              {enviado && (
                <div className="confirmation-success cha-success">
                  <strong>Presença confirmada com sucesso! ❤️</strong>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

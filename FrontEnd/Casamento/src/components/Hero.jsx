// src/components/Hero.jsx

import { useEffect, useState } from "react";
import bg from "../assets/images/hero.jpeg";

export default function Hero() {
  const [tempo, setTempo] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      const dataAlvo = new Date("2026-11-14T15:30:00");
      const agora = new Date();

      const diferenca = dataAlvo - agora;

      if (diferenca <= 0) {
        setTempo("Chegou o grande dia! 💍");
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
      const segundos = Math.floor((diferenca / 1000) % 60);

      setTempo({
        dias,
        horas,
        minutos,
        segundos,
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="hero" style={{ backgroundImage: `url(${bg})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div className="overlay"></div>

      <div className="hero-content">
        <h1>Matheus & Kariny 💍</h1>

        <p>Nosso casamento será dia 14 de Novembro às 15:30 💖</p>
      </div>

      <div className="contagem" style={{marginTop: 80}}>
        <h2>Contagem regressiva para o grande dia:</h2>

        <div className="contador-cards">
          <div className="card">
            <span className="numero">{tempo.dias}</span>
            <span className="label">Dias</span>
          </div>

          <div className="card">
            <span className="numero">{tempo.horas}</span>
            <span className="label">Horas</span>
          </div>

          <div className="card">
            <span className="numero">{tempo.minutos}</span>
            <span className="label">Minutos</span>
          </div>

          <div className="card">
            <span className="numero">{tempo.segundos}</span>
            <span className="label">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// src/components/Hero.jsx

import { useEffect, useState } from "react";
import bg from "../assets/images/hero.jpeg";

export default function Hero() {
  const [tempo, setTempo] = useState({
    meses: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const calcularTempo = () => {
      const dataAlvo = new Date("2027-04-17T19:00:00");
      const agora = new Date();

      if (agora >= dataAlvo) {
        setTempo({
          meses: 0,
          dias: 0,
          horas: 0,
          minutos: 0,
          segundos: 0,
          chegou: true,
        });
        return;
      }

      // Calcula os meses completos
      let meses =
        (dataAlvo.getFullYear() - agora.getFullYear()) * 12 +
        (dataAlvo.getMonth() - agora.getMonth());

      // Data após adicionar os meses completos
      const dataComMeses = new Date(agora);
      dataComMeses.setMonth(dataComMeses.getMonth() + meses);

      // Se passou do dia alvo, corrige o mês
      if (dataComMeses > dataAlvo) {
        meses--;
        dataComMeses.setMonth(dataComMeses.getMonth() - 1);
      }

      // Diferença restante após retirar os meses
      const diferenca = dataAlvo - dataComMeses;

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

      const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);

      const minutos = Math.floor((diferenca / (1000 * 60)) % 60);

      const segundos = Math.floor((diferenca / 1000) % 60);

      setTempo({
        meses,
        dias,
        horas,
        minutos,
        segundos,
        chegou: false,
      });
    };

    calcularTempo();

    const intervalo = setInterval(calcularTempo, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${bg})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="overlay"></div>

      <div className="hero-content">
        <p>Nosso casamento será dia 17 de Abril de 2027 às 19:00 💖</p>
      </div>

      <div className="contagem" style={{ marginTop: 80 }}>
        <h2>Contagem regressiva para o grande dia:</h2>

        {tempo.chegou ? (
          <h2>Chegou o grande dia! 💍❤️</h2>
        ) : (
          <div className="contador-cards">
            {/* MESES */}
            <div className="card">
              <span className="numero">{tempo.meses}</span>

              <span className="label">
                {tempo.meses === 1 ? "Mês" : "Meses"}
              </span>
            </div>

            {/* DIAS */}
            <div className="card">
              <span className="numero">{tempo.dias}</span>

              <span className="label">{tempo.dias === 1 ? "Dia" : "Dias"}</span>
            </div>

            {/* HORAS */}
            <div className="card">
              <span className="numero">
                {String(tempo.horas).padStart(2, "0")}
              </span>

              <span className="label">
                {tempo.horas === 1 ? "Hora" : "Horas"}
              </span>
            </div>

            {/* MINUTOS */}
            <div className="card">
              <span className="numero">
                {String(tempo.minutos).padStart(2, "0")}
              </span>

              <span className="label">
                {tempo.minutos === 1 ? "Minuto" : "Minutos"}
              </span>
            </div>

            {/* SEGUNDOS */}
            <div className="card">
              <span className="numero">
                {String(tempo.segundos).padStart(2, "0")}
              </span>

              <span className="label">
                {tempo.segundos === 1 ? "Segundo" : "Segundos"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

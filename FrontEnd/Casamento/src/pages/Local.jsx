import Navbar from "../components/Navbar";
import BotaoVoltar from "../components/BotaoVoltar";

export default function Local() {
  return (
    <>
      <Navbar />

      <BotaoVoltar />

      <section className="local-container">
        <div className="local-header">
          <h1>Local do Evento 📍</h1>

          <p>
            Fique atento ao local onde celebraremos esse momento tão especial
          </p>
        </div>

        <div className="mapa-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3757.9195304558625!2d-42.64780502548959!3d-19.630737729058005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa54f7f290f8a27%3A0x36bd8b493a2265b5!2zU8OtdGlvIEZyw7Npcw!5e0!3m2!1spt-BR!2sbr!4v1774521932322!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="evento-info">
          <div className="data">📅 17 de Abril de 2027</div>

          <div className="hora">⏰ 19:00</div>
        </div>
      </section>
    </>
  );
}

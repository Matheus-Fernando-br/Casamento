import { Link } from "react-router-dom";

export default function SecaoCha() {
  return (
    <section className="cha-invite-section" aria-labelledby="cha-invite-title">
      <div className="cha-invite-card">
        <div className="cha-invite-content">
          <span className="cha-invite-eyebrow">Um novo capítulo</span>

          <h2 id="cha-invite-title">Chá de Casa Nova</h2>

          <p>Venha celebrar com a gente o início de uma nova fase.</p>
        </div>

        <div className="cha-invite-details">
          <div className="cha-invite-detail">
            <span>Data</span>
            <strong>16 de janeiro de 2027</strong>
          </div>

          <div className="cha-invite-detail">
            <span>Horário</span>
            <strong>16:00</strong>
          </div>

          <div className="cha-invite-detail">
            <span>Local</span>
            <strong>Em cima do Teixerão</strong>
            <small>R. Rosa, 341 — Primavera, Timóteo - MG</small>
          </div>
        </div>

        <Link to="/cha" className="cha-invite-link">
          Confirmar presença
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

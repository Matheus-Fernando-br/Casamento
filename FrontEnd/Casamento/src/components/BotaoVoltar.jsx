import { useNavigate } from "react-router-dom";

export default function BotaoVoltar() {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      <span style={{ color: "#c59d5f" }}>←</span> Voltar
    </button>
  );
}

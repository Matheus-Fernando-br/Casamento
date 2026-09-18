import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://casamento-rg0q.onrender.com";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Não foi possível entrar.");
      }

      sessionStorage.setItem("adminToken", data.token);
      navigate("/painel-admin");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-card">
          <h1>Área dos Noivos</h1>
          <p>Entre para administrar as confirmações de presença.</p>

          {erro && <div className="admin-error">{erro}</div>}

          <form className="admin-form" onSubmit={handleSubmit}>
            <label>
              Login
              <input
                type="text"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                required
                autoComplete="username"
              />
            </label>

            <label>
              Senha
              <input
                type="password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
                autoComplete="current-password"
              />
            </label>

            <button
              className="admin-button"
              type="submit"
              disabled={carregando}
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <Link to="/">Voltar para o site</Link>
        </div>
      </div>
    </main>
  );
}

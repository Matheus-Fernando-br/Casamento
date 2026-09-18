import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "https://casamento-rg0q.onrender.com";

function formatarData(data) {
  if (!data) {
    return "Data não informada";
  }

  return new Date(data).toLocaleString("pt-BR");
}

export default function PainelAdmin() {
  const navigate = useNavigate();

  const [confirmacoes, setConfirmacoes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  const token = sessionStorage.getItem("adminToken");

  const requisicaoAdmin = async (url, options = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (response.status === 401) {
      sessionStorage.removeItem("adminToken");
      navigate("/area-dos-noivos");
      throw new Error("Sessão expirada.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || "Erro na operação.");
    }

    return data;
  };

  const carregarConfirmacoes = async () => {
    try {
      setErro("");

      const data = await requisicaoAdmin("/admin/confirmacoes");
      setConfirmacoes(data);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/area-dos-noivos");
      return;
    }

    carregarConfirmacoes();
  }, []);

  const limparFormulario = () => {
    setNome("");
    setTelefone("");
    setEditandoId(null);
  };

  const salvarPessoa = async (event) => {
    event.preventDefault();

    try {
      setErro("");

      const metodo = editandoId ? "PUT" : "POST";
      const caminho = editandoId
        ? `/admin/confirmacoes/${editandoId}`
        : "/admin/confirmacoes";

      await requisicaoAdmin(caminho, {
        method: metodo,
        body: JSON.stringify({
          nome,
          telefone,
        }),
      });

      limparFormulario();
      await carregarConfirmacoes();
    } catch (error) {
      setErro(error.message);
    }
  };

  const iniciarEdicao = (pessoa) => {
    setEditandoId(pessoa.id);
    setNome(pessoa.nome);
    setTelefone(pessoa.telefone);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const excluirPessoa = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta confirmação?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");

      await requisicaoAdmin(`/admin/confirmacoes/${id}`, {
        method: "DELETE",
      });

      await carregarConfirmacoes();
    } catch (error) {
      setErro(error.message);
    }
  };

  const sair = async () => {
    try {
      await requisicaoAdmin("/admin/logout", {
        method: "POST",
      });
    } catch {
      // A sessão será removida mesmo se o servidor já estiver indisponível.
    } finally {
      sessionStorage.removeItem("adminToken");
      navigate("/area-dos-noivos");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-container">
        <div className="admin-topbar">
          <div>
            <h1>Painel Administrativo</h1>
            <p>{confirmacoes.length} confirmação(ões) cadastrada(s)</p>
          </div>

          <div className="admin-actions">
            <button
              className="admin-button secondary"
              onClick={carregarConfirmacoes}
            >
              Atualizar
            </button>

            <button className="admin-button danger" onClick={sair}>
              Sair
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h2>{editandoId ? "Editar pessoa" : "Adicionar pessoa"}</h2>

          {erro && <div className="admin-error">{erro}</div>}

          <form className="admin-form" onSubmit={salvarPessoa}>
            <label>
              Nome completo
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
              />
            </label>

            <label>
              Telefone
              <input
                type="tel"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                required
              />
            </label>

            <div className="admin-actions">
              <button className="admin-button" type="submit">
                {editandoId ? "Salvar alterações" : "Adicionar pessoa"}
              </button>

              {editandoId && (
                <button
                  className="admin-button secondary"
                  type="button"
                  onClick={limparFormulario}
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </form>

          <h2>Confirmações de presença</h2>

          {carregando ? (
            <p>Carregando confirmações...</p>
          ) : confirmacoes.length === 0 ? (
            <div className="admin-empty">Nenhuma confirmação cadastrada.</div>
          ) : (
            <ul className="admin-list">
              {confirmacoes.map((pessoa) => (
                <li className="admin-list-item" key={pessoa.id}>
                  <div>
                    <strong>{pessoa.nome}</strong>
                    <p>{pessoa.telefone}</p>
                    <small>Confirmado em: {formatarData(pessoa.data)}</small>
                  </div>

                  <div className="admin-actions">
                    <button
                      className="admin-button secondary"
                      onClick={() => iniciarEdicao(pessoa)}
                    >
                      Editar
                    </button>

                    <button
                      className="admin-button danger"
                      onClick={() => excluirPessoa(pessoa.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

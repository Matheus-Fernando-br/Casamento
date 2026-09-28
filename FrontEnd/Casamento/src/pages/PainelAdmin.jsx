import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TIPOS = {
  casamento: "Casamento",
  cha: "Chá Revelação",
};

function formatarData(data) {
  if (!data) return "Data não informada";
  return new Date(data).toLocaleString("pt-BR");
}

function formatarTelefone(valor) {
  const numeros = String(valor || "")
    .replace(/\D/g, "")
    .slice(0, 11);
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }
  if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }
  return valor;
}

export default function PainelAdmin() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  const [tipo, setTipo] = useState("casamento");
  const [confirmacoes, setConfirmacoes] = useState([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  const requisicaoAdmin = useCallback(
    async (url, options = {}) => {
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
      if (!response.ok) throw new Error(data.erro || "Erro na operação.");
      return data;
    },
    [navigate, token],
  );

  const carregarConfirmacoes = useCallback(
    async (tipoSelecionado = tipo) => {
      try {
        setErro("");
        setCarregando(true);
        const data = await requisicaoAdmin(
          `/admin/confirmacoes?tipo=${tipoSelecionado}`,
        );
        setConfirmacoes(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    },
    [requisicaoAdmin, tipo],
  );

  useEffect(() => {
    if (!token) {
      navigate("/area-dos-noivos");
      return;
    }
    carregarConfirmacoes(tipo);
  }, [carregarConfirmacoes, navigate, tipo, token]);

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEditandoId(null);
  }

  const trocarTipo = (novoTipo) => {
    setTipo(novoTipo);
    limparFormulario();
  };

  const salvarPessoa = async (event) => {
    event.preventDefault();

    try {
      setErro("");
      const metodo = editandoId ? "PUT" : "POST";
      const caminhoBase = editandoId
        ? `/admin/confirmacoes/${editandoId}`
        : "/admin/confirmacoes";

      await requisicaoAdmin(`${caminhoBase}?tipo=${tipo}`, {
        method: metodo,
        body: JSON.stringify({ nome, telefone }),
      });

      limparFormulario();
      await carregarConfirmacoes(tipo);
    } catch (error) {
      setErro(error.message);
    }
  };

  const iniciarEdicao = (pessoa) => {
    setEditandoId(pessoa.id);
    setNome(pessoa.nome);
    setTelefone(formatarTelefone(pessoa.telefone));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluirPessoa = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta confirmação?"))
      return;

    try {
      setErro("");
      await requisicaoAdmin(`/admin/confirmacoes/${id}?tipo=${tipo}`, {
        method: "DELETE",
      });
      await carregarConfirmacoes(tipo);
    } catch (error) {
      setErro(error.message);
    }
  };

  const sair = async () => {
    try {
      await requisicaoAdmin("/admin/logout", { method: "POST" });
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
        <header className="admin-topbar">
          <div className="admin-brand">
            <span className="admin-eyebrow">Área dos noivos</span>
            <h1>Painel de confirmações</h1>
            <p>Organize os convidados do seu grande dia.</p>
          </div>
          <button className="admin-button danger admin-logout" onClick={sair}>
            Sair da conta
          </button>
        </header>

        <section className="admin-card admin-overview-card">
          <div className="admin-overview-copy">
            <span className="admin-eyebrow">Evento selecionado</span>
            <h2>{TIPOS[tipo]}</h2>
            <p>Visualize, adicione e gerencie as confirmações deste evento.</p>
          </div>
          <div className="admin-stat">
            <strong>{confirmacoes.length}</strong>
            <span>confirmações</span>
          </div>
        </section>

        <nav className="admin-filter" aria-label="Filtrar evento">
          {Object.entries(TIPOS).map(([chave, titulo]) => (
            <button
              key={chave}
              type="button"
              className={tipo === chave ? "active" : ""}
              onClick={() => trocarTipo(chave)}
            >
              <span className="admin-filter-dot" />
              {titulo}
            </button>
          ))}
        </nav>

        <section className="admin-card admin-workspace">
          <div className="admin-section-heading">
            <div>
              <span className="admin-eyebrow">Cadastro rápido</span>
              <h2>{editandoId ? "Editar convidado" : "Adicionar convidado"}</h2>
            </div>
            {editandoId && (
              <button
                className="admin-link-button"
                type="button"
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>

          {erro && <div className="admin-error">{erro}</div>}

          <form className="admin-form admin-form-grid" onSubmit={salvarPessoa}>
            <label>
              Nome completo
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Ex.: Matheus Fernando"
                required
                maxLength={150}
              />
            </label>
            <label>
              Telefone
              <input
                type="tel"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="(31) 98765-4321"
                required
              />
            </label>
            <button className="admin-button" type="submit">
              {editandoId ? "Salvar alterações" : "Adicionar convidado"}
            </button>
          </form>
        </section>

        <section className="admin-card admin-list-card">
          <div className="admin-section-heading">
            <div>
              <span className="admin-eyebrow">Lista atualizada</span>
              <h2>Convidados de {TIPOS[tipo]}</h2>
            </div>
            <button
              className="admin-button secondary admin-refresh"
              onClick={() => carregarConfirmacoes(tipo)}
              type="button"
            >
              Atualizar lista
            </button>
          </div>

          {carregando ? (
            <div className="admin-loading">Carregando confirmações...</div>
          ) : confirmacoes.length === 0 ? (
            <div className="admin-empty">
              <strong>A lista ainda está vazia</strong>
              <span>As novas confirmações aparecerão aqui.</span>
            </div>
          ) : (
            <ul className="admin-list">
              {confirmacoes.map((pessoa, index) => (
                <li className="admin-list-item" key={pessoa.id}>
                  <span className="admin-list-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="admin-person">
                    <strong>{pessoa.nome}</strong>
                    <p>{formatarTelefone(pessoa.telefone)}</p>
                    <small>Confirmado em {formatarData(pessoa.data)}</small>
                  </div>
                  <div className="admin-actions admin-item-actions">
                    <button
                      className="admin-button secondary"
                      onClick={() => iniciarEdicao(pessoa)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="admin-button danger"
                      onClick={() => excluirPessoa(pessoa.id)}
                      type="button"
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

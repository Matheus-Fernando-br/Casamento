import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TIPOS = {
  casamento: "Casamento",
  cha: "Chá Revelação",
};

function formatarData(data) {
  if (!data) {
    return "Data não informada";
  }

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

      if (!response.ok) {
        throw new Error(data.erro || "Erro na operação.");
      }

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

  const trocarTipo = (novoTipo) => {
    setTipo(novoTipo);
    limparFormulario();
  };

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEditandoId(null);
  }

  const salvarPessoa = async (event) => {
    event.preventDefault();

    try {
      setErro("");

      const metodo = editandoId ? "PUT" : "POST";
      const caminhoBase = editandoId
        ? `/admin/confirmacoes/${editandoId}`
        : "/admin/confirmacoes";
      const caminho = `${caminhoBase}?tipo=${tipo}`;

      await requisicaoAdmin(caminho, {
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
    if (!window.confirm("Tem certeza que deseja excluir esta confirmação?")) {
      return;
    }

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
        <div className="admin-topbar">
          <div>
            <h1>Painel Administrativo</h1>
            <p>
              {confirmacoes.length} confirmação(ões) em {TIPOS[tipo]}
            </p>
          </div>

          <div className="admin-actions">
            <button className="admin-button danger" onClick={sair}>
              Sair
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h2>Lista de confirmações</h2>

          <div
            className="admin-actions"
            style={{ marginBottom: 24, flexWrap: "wrap" }}
          >
            {Object.entries(TIPOS).map(([chave, titulo]) => (
              <button
                key={chave}
                type="button"
                className={`admin-button ${tipo === chave ? "" : "secondary"}`}
                onClick={() => trocarTipo(chave)}
              >
                {titulo}
              </button>
            ))}
          </div>

          {erro && <div className="admin-error">{erro}</div>}

          <h2>
            {editandoId ? "Editar pessoa" : `Adicionar em ${TIPOS[tipo]}`}
          </h2>

          <form className="admin-form" onSubmit={salvarPessoa}>
            <label>
              Nome completo
              <input
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
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

          <h2 style={{ marginBottom: 10 }}>{TIPOS[tipo]}</h2>
          <button
            className="admin-button secondary"
            onClick={() => carregarConfirmacoes(tipo)}
          >
            Atualizar
          </button>

          {carregando ? (
            <p>Carregando confirmações...</p>
          ) : confirmacoes.length === 0 ? (
            <div className="admin-empty">
              Nenhuma confirmação cadastrada em {TIPOS[tipo]}.
            </div>
          ) : (
            <ul className="admin-list">
              {confirmacoes.map((pessoa) => (
                <li className="admin-list-item" key={pessoa.id}>
                  <div>
                    <strong>{pessoa.nome}</strong>
                    <p>{formatarTelefone(pessoa.telefone)}</p>
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

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const API_URL = import.meta.env.VITE_API_URL;

const TIPOS = {
  casamento: "Casamento",
  cha: "Chá de Casa Nova",
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

function sanitizarNomeArquivo(valor) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);

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

    if (salvando) return;

    try {
      setErro("");
      setSalvando(true);

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
    } finally {
      setSalvando(false);
    }
  };

  const iniciarEdicao = (pessoa) => {
    setEditandoId(pessoa.id);
    setNome(pessoa.nome);
    setTelefone(formatarTelefone(pessoa.telefone));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const excluirPessoa = async (id) => {
    if (excluindoId) return;

    if (!window.confirm("Tem certeza que deseja excluir esta confirmação?")) {
      return;
    }

    try {
      setErro("");
      setExcluindoId(id);

      await requisicaoAdmin(`/admin/confirmacoes/${id}?tipo=${tipo}`, {
        method: "DELETE",
      });

      await carregarConfirmacoes(tipo);
    } catch (error) {
      setErro(error.message);
    } finally {
      setExcluindoId(null);
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

  const gerarListaPdf = () => {
    const documento = new jsPDF({ unit: "mm", format: "a4" });
    const margem = 18;
    const larguraUtil = 210 - margem * 2;
    const tituloEvento = TIPOS[tipo];
    const descricao = `Lista completa de convidados confirmados para o ${tituloEvento.toLowerCase()}.`;
    let pagina = 1;
    let y = 24;

    documento.setProperties({
      title: `Lista de Convidados do ${tituloEvento}`,
      subject: `Convidados do ${tituloEvento}`,
    });

    const desenharCabecalhoTabela = () => {
      documento.setFillColor(155, 106, 72);
      documento.roundedRect(margem, y, larguraUtil, 10, 2, 2, "F");
      documento.setFont("helvetica", "bold");
      documento.setFontSize(10);
      documento.setTextColor(255, 255, 255);
      documento.text("Nº", margem + 5, y + 6.5);
      documento.text("Nome", margem + 20, y + 6.5);
      documento.text("Telefone", margem + 135, y + 6.5);
      y += 10;
    };

    documento.setTextColor(63, 48, 39);
    documento.setFont("helvetica", "bold");
    documento.setFontSize(20);
    documento.text(`Lista de Convidados do ${tituloEvento}`, margem, y);
    y += 10;

    documento.setFont("helvetica", "normal");
    documento.setFontSize(10);
    documento.setTextColor(107, 93, 83);
    documento.text(descricao, margem, y);
    y += 7;
    documento.text(
      `${confirmacoes.length} convidado${confirmacoes.length === 1 ? "" : "s"} • Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
      margem,
      y,
    );
    y += 10;
    desenharCabecalhoTabela();

    confirmacoes.forEach((pessoa, index) => {
      const nomeLinhas = documento
        .splitTextToSize(String(pessoa.nome || ""), 100)
        .slice(0, 2);
      const alturaLinha = Math.max(10, nomeLinhas.length * 5 + 5);

      if (y + alturaLinha > 277) {
        documento.addPage();
        pagina += 1;
        y = 20;
        desenharCabecalhoTabela();
      }

      if (index % 2 === 0) {
        documento.setFillColor(250, 246, 242);
        documento.rect(margem, y, larguraUtil, alturaLinha, "F");
      }

      documento.setFont("helvetica", "normal");
      documento.setFontSize(10);
      documento.setTextColor(63, 48, 39);
      documento.text(String(index + 1), margem + 5, y + 6.5);
      documento.text(nomeLinhas, margem + 20, y + 5.5);
      documento.text(
        formatarTelefone(pessoa.telefone) || "Não informado",
        margem + 135,
        y + 6.5,
      );
      documento.setDrawColor(224, 214, 205);
      documento.line(
        margem,
        y + alturaLinha,
        margem + larguraUtil,
        y + alturaLinha,
      );
      y += alturaLinha;
    });

    for (let numeroPagina = 1; numeroPagina <= pagina; numeroPagina += 1) {
      documento.setPage(numeroPagina);
      documento.setFont("helvetica", "normal");
      documento.setFontSize(8);
      documento.setTextColor(150, 135, 124);
      documento.text(`Página ${numeroPagina} de ${pagina}`, 210 - margem, 287, {
        align: "right",
      });
    }

    documento.save(
      `lista-de-convidados-${sanitizarNomeArquivo(tituloEvento)}.pdf`,
    );
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
            <button className="admin-button" type="submit" disabled={salvando}>
              {salvando ? (
                <>
                  <span className="loading-spinner"></span>
                  <span>{editandoId ? "Salvando..." : "Adicionando..."}</span>
                </>
              ) : editandoId ? (
                "Salvar alterações"
              ) : (
                "Adicionar convidado"
              )}
            </button>
          </form>
        </section>

        <section className="admin-card admin-list-card">
          <div className="admin-section-heading">
            <div>
              <span className="admin-eyebrow">Lista atualizada</span>
              <h2>Convidados de {TIPOS[tipo]}</h2>
            </div>
            <div className="admin-list-actions">
              <button
                className="admin-button secondary admin-refresh"
                onClick={() => carregarConfirmacoes(tipo)}
                type="button"
                disabled={carregando}
                aria-label={
                  carregando ? "Atualizando lista" : "Atualizar lista"
                }
                title={carregando ? "Atualizando lista" : "Atualizar lista"}
              >
                <span
                  className={`bi bi-arrow-repeat admin-refresh-icon ${carregando ? "is-spinning" : ""}`}
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="admin-button secondary admin-pdf"
                onClick={gerarListaPdf}
                type="button"
                disabled={carregando || confirmacoes.length === 0}
                title={
                  confirmacoes.length === 0
                    ? "Adicione convidados para gerar a lista"
                    : undefined
                }
              >
                Gerar Lista
              </button>
            </div>
          </div>

          {carregando ? (
            <div className="admin-loading">
              <span className="loading-spinner loading-spinner-dark"></span>
              <span>Carregando confirmações...</span>
            </div>
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
                      disabled={excluindoId === pessoa.id}
                    >
                      {excluindoId === pessoa.id ? (
                        <>
                          <span className="loading-spinner"></span>
                          <span>Excluindo...</span>
                        </>
                      ) : (
                        "Excluir"
                      )}
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

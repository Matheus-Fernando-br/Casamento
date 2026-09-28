require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const sessoes = new Set();

const TABELAS = {
  casamento: "confirmacoes",
  cha: "cha-de-casa-nova",
};

function gerarToken() {
  return crypto.randomBytes(32).toString("hex");
}

function autenticarAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !sessoes.has(token)) {
    return res.status(401).json({ erro: "Não autorizado" });
  }

  next();
}

function obterTabela(tipo = "casamento") {
  return TABELAS[tipo] || null;
}

function validarPessoa(nome, telefone) {
  const nomeTexto = typeof nome === "string" ? nome.trim() : "";
  const telefoneTexto =
    telefone === null || telefone === undefined ? "" : String(telefone).trim();
  const telefoneNumeros = telefoneTexto.replace(/\D/g, "");

  if (!nomeTexto || !telefoneTexto) {
    return "Nome e telefone são obrigatórios";
  }

  if (nomeTexto.length < 1 || nomeTexto.length > 150) {
    return "O nome deve possuir entre 1 e 150 caracteres";
  }

  if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
    return "O telefone deve possuir DDD e 10 ou 11 números";
  }

  return null;
}

function prepararPessoa(nome, telefone) {
  return {
    nome: nome.trim(),
    // Telefone precisa ser salvo como texto. Telefone brasileiro não cabe em int2.
    telefone: String(telefone).trim(),
  };
}

async function buscarConfirmacoes(tabela) {
  const { data, error } = await supabase
    .from(tabela)
    .select("id, nome, telefone, data")
    .order("data", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

async function enviarNotificacaoTelegram(pessoa, confirmacoes, tipo) {
  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.warn("BOT_TOKEN ou CHAT_ID não configurado.");
    return;
  }

  const titulo =
    tipo === "cha"
      ? "🎉 NOVA CONFIRMAÇÃO - CHÁ REVELAÇÃO"
      : "🎉 NOVA CONFIRMAÇÃO DE PRESENÇA";

  const lista = confirmacoes.length
    ? confirmacoes
        .map(
          (convidado, index) =>
            `${index + 1}. ${convidado.nome} - ${convidado.telefone}`,
        )
        .join("\n")
    : "Nenhum convidado.";

  const mensagem = [
    titulo,
    "",
    `👤 Nome: ${pessoa.nome}`,
    `📱 Telefone: ${pessoa.telefone}`,
    "",
    "📋 LISTA ATUALIZADA",
    lista,
    "",
    `👥 Total: ${confirmacoes.length}`,
  ].join("\n");

  await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.CHAT_ID,
      text: mensagem,
    },
  );
}

async function inserirPessoa(tabela, nome, telefone) {
  const dados = prepararPessoa(nome, telefone);
  const { data, error } = await supabase
    .from(tabela)
    .insert(dados)
    .select("id, nome, telefone, data")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

async function atualizarPessoa(tabela, id, nome, telefone) {
  const dados = prepararPessoa(nome, telefone);
  const { data, error } = await supabase
    .from(tabela)
    .update(dados)
    .eq("id", id)
    .select("id, nome, telefone, data")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw error;
  }

  return data;
}

app.post("/admin/login", (req, res) => {
  const { login, senha } = req.body;

  if (
    login !== process.env.ADMIN_LOGIN ||
    senha !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ erro: "Login ou senha inválidos" });
  }

  const token = gerarToken();
  sessoes.add(token);

  return res.json({ sucesso: true, token });
});

app.post("/admin/logout", autenticarAdmin, (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  sessoes.delete(token);
  return res.json({ sucesso: true });
});

app.get("/admin/confirmacoes", autenticarAdmin, async (req, res) => {
  const tipo = req.query.tipo || "casamento";
  const tabela = obterTabela(tipo);

  if (!tabela) {
    return res.status(400).json({ erro: "Tipo de confirmação inválido" });
  }

  try {
    return res.json(await buscarConfirmacoes(tabela));
  } catch (error) {
    console.error(`Erro ao listar confirmações da tabela ${tabela}:`, error);
    return res.status(500).json({ erro: "Erro ao buscar confirmações" });
  }
});

app.post("/admin/confirmacoes", autenticarAdmin, async (req, res) => {
  const tipo = req.query.tipo || "casamento";
  const tabela = obterTabela(tipo);
  const { nome, telefone } = req.body;
  const erroValidacao = validarPessoa(nome, telefone);

  if (!tabela) {
    return res.status(400).json({ erro: "Tipo de confirmação inválido" });
  }

  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  try {
    return res.status(201).json(await inserirPessoa(tabela, nome, telefone));
  } catch (error) {
    console.error(`Erro ao adicionar pessoa na tabela ${tabela}:`, error);
    return res.status(500).json({ erro: "Erro ao adicionar pessoa" });
  }
});

app.put("/admin/confirmacoes/:id", autenticarAdmin, async (req, res) => {
  const tipo = req.query.tipo || "casamento";
  const tabela = obterTabela(tipo);
  const { nome, telefone } = req.body;
  const erroValidacao = validarPessoa(nome, telefone);

  if (!tabela) {
    return res.status(400).json({ erro: "Tipo de confirmação inválido" });
  }

  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  try {
    const pessoa = await atualizarPessoa(tabela, req.params.id, nome, telefone);

    if (!pessoa) {
      return res.status(404).json({ erro: "Confirmação não encontrada" });
    }

    return res.json(pessoa);
  } catch (error) {
    console.error(`Erro ao editar pessoa na tabela ${tabela}:`, error);
    return res.status(500).json({ erro: "Erro ao editar pessoa" });
  }
});

app.delete("/admin/confirmacoes/:id", autenticarAdmin, async (req, res) => {
  const tipo = req.query.tipo || "casamento";
  const tabela = obterTabela(tipo);

  if (!tabela) {
    return res.status(400).json({ erro: "Tipo de confirmação inválido" });
  }

  try {
    const { data, error } = await supabase
      .from(tabela)
      .delete()
      .eq("id", req.params.id)
      .select("id")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({ erro: "Confirmação não encontrada" });
      }
      throw error;
    }

    return res.json({ sucesso: true, id: data.id });
  } catch (error) {
    console.error(`Erro ao excluir pessoa da tabela ${tabela}:`, error);
    return res.status(500).json({ erro: "Erro ao excluir pessoa" });
  }
});

async function registrarConfirmacao(req, res, tipo) {
  const tabela = obterTabela(tipo);
  const { nome, telefone } = req.body;
  const erroValidacao = validarPessoa(nome, telefone);

  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  try {
    const pessoa = await inserirPessoa(tabela, nome, telefone);
    const confirmacoes = await buscarConfirmacoes(tabela);

    try {
      await enviarNotificacaoTelegram(pessoa, confirmacoes, tipo);
    } catch (erroTelegram) {
      console.error("Erro ao enviar notificação ao Telegram:", erroTelegram);
    }

    return res.json({ sucesso: true, pessoa });
  } catch (error) {
    console.error(`Erro ao registrar confirmação na tabela ${tabela}:`, error);
    return res.status(500).json({
      erro: "Erro interno ao registrar confirmação",
      detalhe:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

app.post("/confirmar", (req, res) =>
  registrarConfirmacao(req, res, "casamento"),
);
app.post("/confirmar/cha", (req, res) => registrarConfirmacao(req, res, "cha"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

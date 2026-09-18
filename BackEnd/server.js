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

function gerarToken() {
  return crypto.randomBytes(32).toString("hex");
}

function autenticarAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !sessoes.has(token)) {
    return res.status(401).json({
      erro: "Não autorizado",
    });
  }

  next();
}

function validarPessoa(nome, telefone) {
  if (!nome || !telefone) {
    return "Nome e telefone são obrigatórios";
  }

  if (nome.trim().length < 1 || nome.trim().length > 150) {
    return "O nome deve possuir entre 1 e 150 caracteres";
  }

  if (telefone.trim().length < 1 || telefone.trim().length > 40) {
    return "O telefone deve possuir entre 1 e 40 caracteres";
  }

  return null;
}

async function buscarConfirmacoes() {
  const { data, error } = await supabase
    .from("confirmacoes")
    .select("id, nome, telefone, data")
    .order("data", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

async function enviarNotificacaoTelegram(pessoa, confirmacoes) {
  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.warn("BOT_TOKEN ou CHAT_ID não configurado.");
    return;
  }

  const lista = confirmacoes.length
    ? confirmacoes
        .map(
          (convidado, index) =>
            `${index + 1}. ${convidado.nome} - ${convidado.telefone}`,
        )
        .join("\n")
    : "Nenhum convidado.";

  const mensagem = [
    "🎉 NOVA CONFIRMAÇÃO DE PRESENÇA",
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

app.post("/admin/login", (req, res) => {
  const { login, senha } = req.body;

  const loginConfigurado = process.env.ADMIN_LOGIN || "vida";
  const senhaConfigurada = process.env.ADMIN_PASSWORD || "1704";

  if (login !== loginConfigurado || senha !== senhaConfigurada) {
    return res.status(401).json({
      erro: "Login ou senha inválidos",
    });
  }

  const token = gerarToken();
  sessoes.add(token);

  return res.json({
    sucesso: true,
    token,
  });
});

app.post("/admin/logout", autenticarAdmin, (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    sessoes.delete(token);
  }

  return res.json({
    sucesso: true,
  });
});

app.get("/admin/confirmacoes", autenticarAdmin, async (req, res) => {
  try {
    const confirmacoes = await buscarConfirmacoes();

    return res.json(confirmacoes);
  } catch (error) {
    console.error("Erro ao listar confirmações:", error);

    return res.status(500).json({
      erro: "Erro ao buscar confirmações",
    });
  }
});

app.post("/admin/confirmacoes", autenticarAdmin, async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const erroValidacao = validarPessoa(nome, telefone);

    if (erroValidacao) {
      return res.status(400).json({
        erro: erroValidacao,
      });
    }

    const { data, error } = await supabase
      .from("confirmacoes")
      .insert({
        nome: nome.trim(),
        telefone: telefone.trim(),
      })
      .select("id, nome, telefone, data")
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error("Erro ao adicionar confirmação:", error);

    return res.status(500).json({
      erro: "Erro ao adicionar pessoa",
    });
  }
});

app.put("/admin/confirmacoes/:id", autenticarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    const erroValidacao = validarPessoa(nome, telefone);

    if (erroValidacao) {
      return res.status(400).json({
        erro: erroValidacao,
      });
    }

    const { data, error } = await supabase
      .from("confirmacoes")
      .update({
        nome: nome.trim(),
        telefone: telefone.trim(),
      })
      .eq("id", id)
      .select("id, nome, telefone, data")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          erro: "Confirmação não encontrada",
        });
      }

      throw error;
    }

    return res.json(data);
  } catch (error) {
    console.error("Erro ao editar confirmação:", error);

    return res.status(500).json({
      erro: "Erro ao editar pessoa",
    });
  }
});

app.delete("/admin/confirmacoes/:id", autenticarAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("confirmacoes")
      .delete()
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          erro: "Confirmação não encontrada",
        });
      }

      throw error;
    }

    return res.json({
      sucesso: true,
      id: data.id,
    });
  } catch (error) {
    console.error("Erro ao excluir confirmação:", error);

    return res.status(500).json({
      erro: "Erro ao excluir pessoa",
    });
  }
});

app.post("/confirmar", async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const erroValidacao = validarPessoa(nome, telefone);

    if (erroValidacao) {
      return res.status(400).json({
        erro: erroValidacao,
      });
    }

    const { data: pessoa, error: erroInsercao } = await supabase
      .from("confirmacoes")
      .insert({
        nome: nome.trim(),
        telefone: telefone.trim(),
      })
      .select("id, nome, telefone, data")
      .single();

    if (erroInsercao) {
      throw erroInsercao;
    }

    const confirmacoes = await buscarConfirmacoes();

    try {
      await enviarNotificacaoTelegram(pessoa, confirmacoes);
    } catch (erroTelegram) {
      console.error("Erro ao enviar notificação ao Telegram:", erroTelegram);
    }

    return res.json({
      sucesso: true,
      pessoa,
    });
  } catch (error) {
    console.error("Erro ao registrar confirmação:", error);

    return res.status(500).json({
      erro: "Erro interno ao registrar confirmação",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

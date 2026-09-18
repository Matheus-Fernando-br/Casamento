require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const arquivo = path.join(__dirname, "convidados.json");
const sessoes = new Set();

function lerConvidados() {
  if (!fs.existsSync(arquivo)) {
    fs.writeFileSync(arquivo, "[]");
  }

  return JSON.parse(fs.readFileSync(arquivo, "utf8"));
}

function salvarConvidados(lista) {
  fs.writeFileSync(arquivo, JSON.stringify(lista, null, 2));
}

function gerarId() {
  return crypto.randomUUID();
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

async function enviarNotificacaoTelegram(pessoa, convidados) {
  if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.log("BOT_TOKEN ou CHAT_ID não configurado.");
    return;
  }

  const lista = convidados
    .map(
      (convidado, index) =>
        `${index + 1}. ${convidado.nome} - ${convidado.telefone}`,
    )
    .join("\n");

  const mensagem = [
    "🎉 NOVA CONFIRMAÇÃO DE PRESENÇA",
    "",
    `👤 Nome: ${pessoa.nome}`,
    `📱 Telefone: ${pessoa.telefone}`,
    "",
    "📋 LISTA ATUALIZADA",
    lista || "Nenhum convidado.",
    "",
    `👥 Total: ${convidados.length}`,
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

  const token = crypto.randomBytes(32).toString("hex");
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

app.get("/admin/confirmacoes", autenticarAdmin, (req, res) => {
  return res.json(lerConvidados());
});

app.post("/admin/confirmacoes", autenticarAdmin, (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({
      erro: "Nome e telefone são obrigatórios",
    });
  }

  const convidados = lerConvidados();

  const pessoa = {
    id: gerarId(),
    nome: nome.trim(),
    telefone: telefone.trim(),
    data: new Date().toISOString(),
  };

  convidados.push(pessoa);
  salvarConvidados(convidados);

  return res.status(201).json(pessoa);
});

app.put("/admin/confirmacoes/:id", autenticarAdmin, (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;

  if (!nome || !telefone) {
    return res.status(400).json({
      erro: "Nome e telefone são obrigatórios",
    });
  }

  const convidados = lerConvidados();
  const indice = convidados.findIndex((pessoa) => pessoa.id === id);

  if (indice === -1) {
    return res.status(404).json({
      erro: "Confirmação não encontrada",
    });
  }

  convidados[indice] = {
    ...convidados[indice],
    nome: nome.trim(),
    telefone: telefone.trim(),
  };

  salvarConvidados(convidados);

  return res.json(convidados[indice]);
});

app.delete("/admin/confirmacoes/:id", autenticarAdmin, (req, res) => {
  const { id } = req.params;
  const convidados = lerConvidados();
  const novaLista = convidados.filter((pessoa) => pessoa.id !== id);

  if (novaLista.length === convidados.length) {
    return res.status(404).json({
      erro: "Confirmação não encontrada",
    });
  }

  salvarConvidados(novaLista);

  return res.json({
    sucesso: true,
  });
});

app.post("/confirmar", async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({
        erro: "Nome e telefone são obrigatórios",
      });
    }

    const convidados = lerConvidados();

    const pessoa = {
      id: gerarId(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      data: new Date().toISOString(),
    };

    convidados.push(pessoa);
    salvarConvidados(convidados);

    try {
      await enviarNotificacaoTelegram(pessoa, convidados);
    } catch (erroTelegram) {
      console.error(
        "Falha ao enviar notificação para o Telegram:",
        erroTelegram,
      );
    }

    return res.json({
      sucesso: true,
      pessoa,
    });
  } catch (erro) {
    console.error(erro);

    return res.status(500).json({
      erro: "Erro interno",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});

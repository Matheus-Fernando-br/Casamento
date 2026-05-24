require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const arquivo = "./convidados.json";

function lerConvidados() {
  if (!fs.existsSync(arquivo)) {
    fs.writeFileSync(arquivo, "[]");
  }

  return JSON.parse(fs.readFileSync(arquivo));
}

function salvarConvidados(lista) {
  fs.writeFileSync(arquivo, JSON.stringify(lista, null, 2));
}

async function enviarMensagem(texto, botoes = []) {
  await axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: process.env.CHAT_ID,
      text: texto,
      reply_markup: {
        inline_keyboard: botoes,
      },
    },
  );
}

app.post("/confirmar", async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({
        erro: "Dados obrigatórios",
      });
    }

    const convidados = lerConvidados();

    convidados.push({
      nome,
      telefone,
      data: new Date(),
    });

    salvarConvidados(convidados);

    const lista = convidados
      .map((pessoa, index) => `${index + 1}. ${pessoa.nome}`)
      .join("\n");

    const mensagem = `
🎉 NOVA CONFIRMAÇÃO

👤 ${nome}
📱 ${telefone}

━━━━━━━━━━

📋 LISTA ATUALIZADA

${lista}

━━━━━━━━━━

👥 Total: ${convidados.length}
`;

    await enviarMensagem(mensagem, [
      [
        {
          text: "📋 Ver Lista",
          callback_data: "listar",
        },
      ],
      [
        {
          text: "❌ Remover Último",
          callback_data: "remover_ultimo",
        },
      ],
    ]);

    res.json({
      sucesso: true,
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: "Erro interno",
    });
  }
});

app.post("/telegram-webhook", async (req, res) => {
  try {
    const callback = req.body.callback_query;

    if (!callback) {
      return res.sendStatus(200);
    }

    const chatId = callback.message.chat.id;
    const data = callback.data;

    let convidados = lerConvidados();

    if (data === "listar") {
      const lista = convidados.length
        ? convidados
            .map(
              (pessoa, index) =>
                `${index + 1}. ${pessoa.nome} - ${pessoa.telefone}`,
            )
            .join("\n")
        : "Nenhum convidado.";

      await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: `📋 LISTA COMPLETA\n\n${lista}`,
        },
      );
    }

    if (data === "remover_ultimo") {
      convidados.pop();

      salvarConvidados(convidados);

      await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text: "❌ Último convidado removido com sucesso",
        },
      );
    }

    res.sendStatus(200);
  } catch (erro) {
    console.log(erro);

    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const caminhoArquivo = "./convidados.json";

function lerConvidados() {
  const dados = fs.readFileSync(caminhoArquivo);
  return JSON.parse(dados);
}

function salvarConvidados(lista) {
  fs.writeFileSync(caminhoArquivo, JSON.stringify(lista, null, 2));
}

app.post("/confirmar", async (req, res) => {
  try {
    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
      return res.status(400).json({
        erro: "Nome e telefone obrigatórios",
      });
    }

    const convidados = lerConvidados();

    convidados.push({
      nome,
      telefone,
      data: new Date(),
    });

    salvarConvidados(convidados);

    const listaNomes = convidados
      .map((pessoa, index) => `${index + 1}. ${pessoa.nome}`)
      .join("\n");

    const mensagem = `
🎉 NOVA CONFIRMAÇÃO

👤 Nome: ${nome}
📱 Telefone: ${telefone}

━━━━━━━━━━

📋 LISTA ATUALIZADA

${listaNomes}

━━━━━━━━━━

👥 Total: ${convidados.length}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: mensagem,
      },
    );

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

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando");
});

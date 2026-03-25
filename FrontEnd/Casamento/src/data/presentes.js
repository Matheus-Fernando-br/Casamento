import geladeira from "../assets/presentes/geladeira.jpg";
import fogao from "../assets/presentes/fogao.jpg";
import cama from "../assets/presentes/cama.jpg";
import sofa from "../assets/presentes/sofa.jpg";
import guarda from "../assets/presentes/guarda.jpg";
import mesa from "../assets/presentes/mesa.jpg";
import microondas from "../assets/presentes/microondas.jfif";
import airfryer from "../assets/presentes/airfryer.jpg";
import ventilador from "../assets/presentes/ventilador.jpg";
import tv from "../assets/presentes/tv.jpg";

import criadomudo from "../assets/presentes/criadomudo.jpg";
import estante from "../assets/presentes/estantetv.jpg";
import lampada from "../assets/presentes/lampada.jpg";
import lixbanheiro from "../assets/presentes/lixeirabanheiro.jpg";
import lixcozinha from "../assets/presentes/lixeiracozinha.jpg";
import tapetebanheiro from "../assets/presentes/tapetebanheiro.jpg";
import mop from "../assets/presentes/mop.jpg";
import vassoura from "../assets/presentes/vassoura.jpg";
import aparelho from "../assets/presentes/aparelho.jpg";

import tapete from "../assets/presentes/tapetesala.jpg";
import bebedouro from "../assets/presentes/bebedouro.jpg";
import botijao from "../assets/presentes/botijao.jfif";
import espelho from "../assets/presentes/espelho.jfif";
import armario from "../assets/presentes/armariocozinha.jfif";

import varal from "../assets/presentes/varal.jpg";
import misteira from "../assets/presentes/misteira.jpg";
import maquinalavar from "../assets/presentes/maquinalavar.jpg";
import liquidificador from "../assets/presentes/liquidificador.jpg";

import lua from "../assets/presentes/lua.jpg";
import emergencia from "../assets/presentes/emergencia.jpg";
import compras from "../assets/presentes/compras.jpg";
import cesto from "../assets/presentes/cesto.jfif";
import aspirador from "../assets/presentes/aspirador.jpg";
import cortina from "../assets/presentes/cortina.jfif";
import ferramentas from "../assets/presentes/ferramenta.jfif";

export const categorias = [
  {
    id: "essenciais",
    titulo: "Essenciais da Casa ⭐",
    itens: [
      {
        id: 1,
        nome: "Geladeira",
        descricao: "Para conservar nossos alimentos com amor 🧊",
        preco: 3230,
        imagem: geladeira,
      },

      {
        id: 2,
        nome: "Fogão",
        descricao: "Para prepararmos nossas refeições 🍳",
        preco: 1430,
        imagem: fogao,
      },

      {
        id: 22,
        nome: "Armário de cozinha",
        descricao: "Para organizar nossos utensílios 🍽️",
        preco: 1200,
        imagem: armario,
      },

      {
        id: 25,
        nome: "Máquina de lavar",
        descricao: "Facilitando o cuidado das roupas 🧺",
        preco: 2100,
        imagem: maquinalavar,
      },

      {
        id: 23,
        nome: "Botijão de gás",
        descricao: "Essencial para cozinhar nossas refeições 🔥",
        preco: 280,
        imagem: botijao,
      },

      {
        id: 6,
        nome: "Mesa",
        descricao: "Para compartilhar refeições 🍽️",
        preco: 1350,
        imagem: mesa,
      },
    ],
  },

  {
    id: "sala",
    titulo: "Sala 🛋️",
    itens: [
      {
        id: 4,
        nome: "Sofá",
        descricao: "Para nossos momentos de descanso 🛋️",
        preco: 1810,
        imagem: sofa,
      },

      {
        id: 10,
        nome: "TV",
        descricao: "Para nossos momentos de lazer 📺",
        preco: 2300,
        imagem: tv,
      },

      {
        id: 12,
        nome: "Estante",
        descricao: "Para organizar objetos 📚",
        preco: 620,
        imagem: estante,
      },

      {
        id: 20,
        nome: "Tapete da Sala",
        descricao: "Ambiente mais aconchegante 🏠",
        preco: 240,
        imagem: tapete,
      },
      {
        id: 34,
        nome: "Cortina para sala",
        descricao: "Para deixar a sala mais aconchegante e elegante 🏠",
        preco: 230,
        imagem: cortina,
      },
    ],
  },

  {
    id: "quarto",
    titulo: "Quarto 🛏️",
    itens: [
      {
        id: 3,
        nome: "Cama",
        descricao: "Para nossos sonhos juntos 🛏️",
        preco: 2150,
        imagem: cama,
      },

      {
        id: 5,
        nome: "Guarda roupa",
        descricao: "Organização das roupas 👕",
        preco: 1750,
        imagem: guarda,
      },

      {
        id: 11,
        nome: "Criado mudo",
        descricao: "Para deixar o quarto completo 🛌",
        preco: 350,
        imagem: criadomudo,
      },

      {
        id: 26,
        nome: "Varal de roupas",
        descricao: "Para secar nossas roupas ☀️",
        preco: 140,
        imagem: varal,
      },
      {
        id: 24,
        nome: "Espelho",
        descricao: "Para deixar o lar ainda mais bonito 🪞",
        preco: 320,
        imagem: espelho,
      },
    ],
  },

  {
    id: "cozinha",
    titulo: "Cozinha 🍳",
    itens: [
      {
        id: 7,
        nome: "Microondas",
        descricao: "Praticidade no dia a dia ⚡",
        preco: 550,
        imagem: microondas,
      },

      {
        id: 8,
        nome: "Air fryer",
        descricao: "Comidas mais saudáveis 🍟",
        preco: 450,
        imagem: airfryer,
      },

      {
        id: 27,
        nome: "Misteira",
        descricao: "Sanduíches deliciosos 🥪",
        preco: 120,
        imagem: misteira,
      },

      {
        id: 28,
        nome: "Liquidificador",
        descricao: "Sucos e receitas 🧃",
        preco: 180,
        imagem: liquidificador,
      },

      {
        id: 21,
        nome: "Bebedouro",
        descricao: "Água sempre gelada 💧",
        preco: 630,
        imagem: bebedouro,
      },

      {
        id: 15,
        nome: "Lixeira cozinha",
        descricao: "Organização da cozinha 🗑️",
        preco: 80,
        imagem: lixcozinha,
      },
    ],
  },

  {
    id: "limpeza",
    titulo: "Limpeza 🧹",
    itens: [
      {
        id: 17,
        nome: "Mop limpeza",
        descricao: "Para manter a casa limpa ✨",
        preco: 150,
        imagem: mop,
      },

      {
        id: 18,
        nome: "Vassoura",
        descricao: "Essencial para limpeza 🧹",
        preco: 45,
        imagem: vassoura,
      },

      {
        id: 14,
        nome: "Lixeira banheiro",
        descricao: "Organização do banheiro 🚿",
        preco: 70,
        imagem: lixbanheiro,
      },

      {
        id: 16,
        nome: "Tapete banheiro",
        descricao: "Mais conforto 🛁",
        preco: 90,
        imagem: tapetebanheiro,
      },
      {
        id: 32,
        nome: "Cesto de Roupas Sujas",
        descricao: "Para manter a organização do quarto  com as roupas sujas🧺",
        preco: 45,
        imagem: cesto,
      },
      {
        id: 33,
        nome: "Aspirador de Pó",
        descricao: "Para facilitar a limpeza da casa 🧹",
        preco: 45,
        imagem: aspirador,
      },
    ],
  },

  {
    id: "extras",
    titulo: "Extras 🎁",
    itens: [
      {
        id: 9,
        nome: "Ventilador",
        descricao: "Dias mais frescos 🌬️",
        preco: 250,
        imagem: ventilador,
      },

      {
        id: 13,
        nome: "Lâmpada",
        descricao: "Iluminando o lar 💡",
        preco: 100,
        imagem: lampada,
      },

      {
        id: 19,
        nome: "Aparelho TV",
        descricao: "Para a TV ter canais para assistir",
        preco: 350,
        imagem: aparelho,
      },
      {
        id: 29,
        nome: "Contribuição com a Lua de Mel",
        descricao: "Nos ajude a realizar nossa lua de mel dos sonhos 🌴",
        preco: 100,
        imagem: lua,
      },
      {
        id: 30,
        nome: "Contribuição para o Fundo de Emergência",
        descricao:
          "Ajude-nos a construir um fundo de emergência para imprevistos 💰",
        preco: 50,
        imagem: emergencia,
      },
      {
        id: 31,
        nome: "Contribuição com a Primeira Compra do Lar",
        descricao: "Nos ajude com as compras do nosso lar 🏠",
        preco: 70,
        imagem: compras,
      },
      {
        id: 35,
        nome: "Caixa de ferramentas",
        descricao: "Para pequenos reparos e manutenções em casa 🛠️",
        preco: 160,
        imagem: ferramentas,
      },
    ],
  },
];

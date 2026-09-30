import airFryer from "../assets/presentes/air-fryer.svg";
import almofadas from "../assets/presentes/almofadas.svg";
import aspiradorDePo from "../assets/presentes/aspirador-de-po.svg";
import aspiradorPortatil from "../assets/presentes/aspirador-portatil.svg";
import assadeiras from "../assets/presentes/assadeiras.svg";
import bebedouro from "../assets/presentes/bebedouro.svg";
import botijaoDeGas from "../assets/presentes/botijao-de-gas.svg";
import cabides from "../assets/presentes/cabides.svg";
import cafeDaManhaDaLuaDeMel from "../assets/presentes/cafe-da-manha-da-lua-de-mel.svg";
import cafeteira from "../assets/presentes/cafeteira.svg";
import cama from "../assets/presentes/cama.svg";
import cestaParaONovoLar from "../assets/presentes/cesta-para-o-novo-lar.svg";
import cestoDeRoupas from "../assets/presentes/cesto-de-roupas.svg";
import comprasParaACasa from "../assets/presentes/compras-para-a-casa.svg";
import conjuntoDeFacas from "../assets/presentes/conjunto-de-facas.svg";
import contribuicaoLivre from "../assets/presentes/contribuicao-livre.svg";
import cortinas from "../assets/presentes/cortinas.svg";
import criadoMudo from "../assets/presentes/criado-mudo.svg";
import escorredorDeLoucas from "../assets/presentes/escorredor-de-loucas.svg";
import espelho from "../assets/presentes/espelho.svg";
import experienciaRomantica from "../assets/presentes/experiencia-romantica.svg";
import fogao from "../assets/presentes/fogao.svg";
import frigideira from "../assets/presentes/frigideira.svg";
import geladeira from "../assets/presentes/geladeira.svg";
import guardaRoupa from "../assets/presentes/guarda-roupa.svg";
import hospedagemDaLuaDeMel from "../assets/presentes/hospedagem-da-lua-de-mel.svg";
import jantarDaLuaDeMel from "../assets/presentes/jantar-da-lua-de-mel.svg";
import jogoDeBanheiro from "../assets/presentes/jogo-de-banheiro.svg";
import jogoDeCopos from "../assets/presentes/jogo-de-copos.svg";
import jogoDePanelas from "../assets/presentes/jogo-de-panelas.svg";
import jogoDePratos from "../assets/presentes/jogo-de-pratos.svg";
import jogoDeTalheres from "../assets/presentes/jogo-de-talheres.svg";
import jogoDeToalhas from "../assets/presentes/jogo-de-toalhas.svg";
import kitDeEmergencia from "../assets/presentes/kit-de-emergencia.svg";
import kitDeFerramentas from "../assets/presentes/kit-de-ferramentas.svg";
import lampadas from "../assets/presentes/lampadas.svg";
import liquidificador from "../assets/presentes/liquidificador.svg";
import lixeira from "../assets/presentes/lixeira.svg";
import luminaria from "../assets/presentes/luminaria.svg";
import mantas from "../assets/presentes/mantas.svg";
import maquinaDeLavar from "../assets/presentes/maquina-de-lavar.svg";
import mesaDeJantar from "../assets/presentes/mesa-de-jantar.svg";
import microOndas from "../assets/presentes/micro-ondas.svg";
import mop from "../assets/presentes/mop.svg";
import noiteEspecial from "../assets/presentes/noite-especial.svg";
import organizadores from "../assets/presentes/organizadores.svg";
import panosDePrato from "../assets/presentes/panos-de-prato.svg";
import passeioDaLuaDeMel from "../assets/presentes/passeio-da-lua-de-mel.svg";
import potesHermeticos from "../assets/presentes/potes-hermeticos.svg";
import roupaDeCama from "../assets/presentes/roupa-de-cama.svg";
import sanduicheira from "../assets/presentes/sanduicheira.svg";
import sofa from "../assets/presentes/sofa.svg";
import tabuaDeCorte from "../assets/presentes/tabua-de-corte.svg";
import tapetes from "../assets/presentes/tapetes.svg";
import tv from "../assets/presentes/tv.svg";
import umBrindeParaALuaDeMel from "../assets/presentes/um-brinde-para-a-lua-de-mel.svg";
import umPresenteSimbolico from "../assets/presentes/um-presente-simbolico.svg";
import utensiliosDeCozinha from "../assets/presentes/utensilios-de-cozinha.svg";
import varal from "../assets/presentes/varal.svg";
import ventilador from "../assets/presentes/ventilador.svg";

// ============================================================
// CATEGORIAS E PRESENTES
// ============================================================

export const categorias = [
  {
    id: "casa-moveis",
    titulo: "Casa e móveis 🏠",
    itens: [
      {
        id: 1,
        nome: "Fogão",
        descricao: "Para prepararmos nossas refeições com carinho.",
        preco: 1029,
        imagem: fogao,
      },
      {
        id: 2,
        nome: "Geladeira",
        descricao: "Para conservar nossos alimentos.",
        preco: 2646,
        imagem: geladeira,
      },
      {
        id: 3,
        nome: "Sofá",
        descricao: "Para nossos momentos de descanso.",
        preco: 1890,
        imagem: sofa,
      },
      {
        id: 4,
        nome: "Mesa de jantar",
        descricao: "Para compartilhar refeições e histórias.",
        preco: 1344,
        imagem: mesaDeJantar,
      },
      {
        id: 7,
        nome: "Máquina de lavar",
        descricao: "Para facilitar o cuidado das roupas.",
        preco: 1932,
        imagem: maquinaDeLavar,
      },
      {
        id: 9,
        nome: "TV",
        descricao: "Para nossos momentos de lazer.",
        preco: 1974,
        imagem: tv,
      },
      {
        id: 29,
        nome: "Tapetes",
        descricao: "Para deixar os ambientes aconchegantes.",
        preco: 420,
        imagem: tapetes,
      },
      {
        id: 33,
        nome: "Almofadas",
        descricao: "Conforto para a nossa sala.",
        preco: 126,
        imagem: almofadas,
      },
      {
        id: 34,
        nome: "Mantas",
        descricao: "Aconchego para os dias tranquilos.",
        preco: 168,
        imagem: mantas,
      },
      {
        id: 35,
        nome: "Cortinas",
        descricao: "Para completar a decoração.",
        preco: 1117,
        imagem: cortinas,
      },
      {
        id: 38,
        nome: "Luminária",
        descricao: "Uma luz especial para o nosso lar.",
        preco: 252,
        imagem: luminaria,
      },
      {
        id: 39,
        nome: "Ventilador",
        descricao: "Para os dias mais frescos.",
        preco: 252,
        imagem: ventilador,
      },
      {
        id: 44,
        nome: "Bebedouro",
        descricao: "Água sempre fresquinha.",
        preco: 588,
        imagem: bebedouro,
      },
      {
        id: 46,
        nome: "Kit de ferramentas",
        descricao: "Para pequenos reparos e manutenções.",
        preco: 294,
        imagem: kitDeFerramentas,
      },
      {
        id: 47,
        nome: "Lâmpadas",
        descricao: "Iluminando cada cantinho do lar.",
        preco: 126,
        imagem: lampadas,
      },
      {
        id: 49,
        nome: "Kit de emergência",
        descricao: "Prevenção para imprevistos.",
        preco: 210,
        imagem: kitDeEmergencia,
      },
    ],
  },
  {
    id: "cozinha",
    titulo: "Cozinha 🍳",
    itens: [
      {
        id: 8,
        nome: "Micro-ondas",
        descricao: "Praticidade no dia a dia.",
        preco: 609,
        imagem: microOndas,
      },
      {
        id: 10,
        nome: "Air fryer",
        descricao: "Receitas práticas e deliciosas.",
        preco: 336,
        imagem: airFryer,
      },
      {
        id: 11,
        nome: "Liquidificador",
        descricao: "Sucos, vitaminas e receitas.",
        preco: 210,
        imagem: liquidificador,
      },
      {
        id: 12,
        nome: "Cafeteira",
        descricao: "Para começar os dias com café.",
        preco: 252,
        imagem: cafeteira,
      },
      {
        id: 13,
        nome: "Sanduicheira",
        descricao: "Lanches rápidos para compartilhar.",
        preco: 126,
        imagem: sanduicheira,
      },
      {
        id: 15,
        nome: "Jogo de panelas",
        descricao: "Para preparar muitas receitas.",
        preco: 414,
        imagem: jogoDePanelas,
      },
      {
        id: 16,
        nome: "Jogo de pratos",
        descricao: "Para montar uma mesa linda.",
        preco: 210,
        imagem: jogoDePratos,
      },
      {
        id: 17,
        nome: "Jogo de copos",
        descricao: "Para servir bebidas com carinho.",
        preco: 126,
        imagem: jogoDeCopos,
      },
      {
        id: 18,
        nome: "Jogo de talheres",
        descricao: "Para completar nossa mesa.",
        preco: 210,
        imagem: jogoDeTalheres,
      },
      {
        id: 21,
        nome: "Potes herméticos",
        descricao: "Organização e praticidade.",
        preco: 168,
        imagem: potesHermeticos,
      },
      {
        id: 22,
        nome: "Escorredor de louças",
        descricao: "Para manter a cozinha organizada.",
        preco: 126,
        imagem: escorredorDeLoucas,
      },
      {
        id: 23,
        nome: "Tábua de corte",
        descricao: "Para preparar os ingredientes.",
        preco: 84,
        imagem: tabuaDeCorte,
      },
      {
        id: 24,
        nome: "Conjunto de facas",
        descricao: "Precisão para cada receita.",
        preco: 126,
        imagem: conjuntoDeFacas,
      },
      {
        id: 25,
        nome: "Assadeiras",
        descricao: "Para bolos, massas e momentos doces.",
        preco: 168,
        imagem: assadeiras,
      },
      {
        id: 26,
        nome: "Frigideira",
        descricao: "Para refeições rápidas e saborosas.",
        preco: 63,
        imagem: frigideira,
      },
      {
        id: 27,
        nome: "Utensílios de cozinha",
        descricao: "Pequenos ajudantes para o dia a dia.",
        preco: 126,
        imagem: utensiliosDeCozinha,
      },
      {
        id: 28,
        nome: "Panos de prato",
        descricao: "Praticidade para nossa cozinha.",
        preco: 50,
        imagem: panosDePrato,
      },
      {
        id: 48,
        nome: "Botijão de gás",
        descricao: "Essencial para cozinhar nossas refeições.",
        preco: 126,
        imagem: botijaoDeGas,
      },
    ],
  },
  {
    id: "quarto-banho",
    titulo: "Quarto e banho 🛏️",
    itens: [
      {
        id: 5,
        nome: "Cama",
        descricao: "Para nossos sonhos juntos.",
        preco: 1764,
        imagem: cama,
      },
      {
        id: 6,
        nome: "Guarda-roupa",
        descricao: "Para organizar nossas roupas.",
        preco: 1680,
        imagem: guardaRoupa,
      },
      {
        id: 19,
        nome: "Jogo de toalhas",
        descricao: "Conforto para o nosso novo lar.",
        preco: 210,
        imagem: jogoDeToalhas,
      },
      {
        id: 20,
        nome: "Roupa de cama",
        descricao: "Para noites aconchegantes.",
        preco: 252,
        imagem: roupaDeCama,
      },
      {
        id: 32,
        nome: "Cabides",
        descricao: "Para cuidar e organizar nossas roupas.",
        preco: 84,
        imagem: cabides,
      },
      {
        id: 36,
        nome: "Espelho",
        descricao: "Para deixar o lar ainda mais bonito.",
        preco: 336,
        imagem: espelho,
      },
      {
        id: 37,
        nome: "Criado-mudo",
        descricao: "Para deixar o quarto completo.",
        preco: 336,
        imagem: criadoMudo,
      },
      {
        id: 41,
        nome: "Jogo de banheiro",
        descricao: "Conforto e cuidado em cada detalhe.",
        preco: 168,
        imagem: jogoDeBanheiro,
      },
    ],
  },
  {
    id: "limpeza-organizacao",
    titulo: "Limpeza e organização ✨",
    itens: [
      {
        id: 14,
        nome: "Aspirador de pó",
        descricao: "Para deixar a casa sempre limpa.",
        preco: 504,
        imagem: aspiradorDePo,
      },
      {
        id: 30,
        nome: "Organizadores",
        descricao: "Cada coisa no seu lugar.",
        preco: 210,
        imagem: organizadores,
      },
      {
        id: 31,
        nome: "Lixeira",
        descricao: "Para manter tudo limpo e organizado.",
        preco: 126,
        imagem: lixeira,
      },
      {
        id: 40,
        nome: "Varal",
        descricao: "Para secar nossas roupas.",
        preco: 168,
        imagem: varal,
      },
      {
        id: 42,
        nome: "Mop",
        descricao: "Para manter a casa brilhando.",
        preco: 126,
        imagem: mop,
      },
      {
        id: 43,
        nome: "Aspirador portátil",
        descricao: "Praticidade para pequenas limpezas.",
        preco: 294,
        imagem: aspiradorPortatil,
      },
      {
        id: 45,
        nome: "Cesto de roupas",
        descricao: "Para manter a lavanderia organizada.",
        preco: 126,
        imagem: cestoDeRoupas,
      },
    ],
  },
  {
    id: "lua-de-mel",
    titulo: "Lua de mel 🌙",
    itens: [
      {
        id: 51,
        nome: "Jantar da lua de mel",
        descricao: "Um jantar inesquecível a dois.",
        preco: 420,
        imagem: jantarDaLuaDeMel,
      },
      {
        id: 52,
        nome: "Café da manhã da lua de mel",
        descricao: "Um começo de dia cheio de carinho.",
        preco: 210,
        imagem: cafeDaManhaDaLuaDeMel,
      },
      {
        id: 53,
        nome: "Passeio da lua de mel",
        descricao: "Uma experiência para guardar na memória.",
        preco: 588,
        imagem: passeioDaLuaDeMel,
      },
      {
        id: 54,
        nome: "Hospedagem da lua de mel",
        descricao: "Nossa estadia especial.",
        preco: 1260,
        imagem: hospedagemDaLuaDeMel,
      },
      {
        id: 55,
        nome: "Experiência romântica",
        descricao: "Um momento romântico só nosso.",
        preco: 504,
        imagem: experienciaRomantica,
      },
      {
        id: 56,
        nome: "Um brinde para a lua de mel",
        descricao: "Para celebrar o nosso amor.",
        preco: 252,
        imagem: umBrindeParaALuaDeMel,
      },
      {
        id: 57,
        nome: "Noite especial",
        descricao: "Uma noite para ficar na lembrança.",
        preco: 756,
        imagem: noiteEspecial,
      },
    ],
  },
  {
    id: "contribuicoes",
    titulo: "Contribuições 💛",
    itens: [
      {
        id: 50,
        nome: "Compras para a casa",
        descricao: "Ajude-nos a montar nosso novo lar.",
        preco: 420,
        imagem: comprasParaACasa,
      },
      {
        id: 58,
        nome: "Cesta para o novo lar",
        descricao: "Um carinho para começar nossa vida juntos.",
        preco: 210,
        imagem: cestaParaONovoLar,
      },
      {
        id: 59,
        nome: "Contribuição livre",
        descricao: "Escolha o valor e faça parte da nossa história.",
        preco: 400,
        imagem: contribuicaoLivre,
      },
      {
        id: 60,
        nome: "Um presente simbólico",
        descricao: "Seu carinho já é um presente enorme.",
        preco: 160,
        imagem: umPresenteSimbolico,
      },
    ],
  },
];

// ============================================================
// TODOS OS ITENS
// ============================================================

export const todosOsItens = categorias.flatMap((categoria) =>
  categoria.itens.map((item) => ({
    ...item,
    categoriaId: categoria.id,
    categoria: categoria.titulo,
  })),
);

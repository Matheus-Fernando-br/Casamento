# 💍 Site de Casamento - Matheus & Kariny

Este é um site desenvolvido em React para compartilhar a história do casal, exibir fotos especiais e permitir que convidados possam enviar presentes ou contribuições via Pix.

O objetivo do projeto é criar uma experiência simples, bonita e funcional para os convidados acompanharem a jornada do casal até o grande dia.

Data do casamento: 14 de novembro de 2026

--------------------------------------------------

# Funcionalidades

- Carrossel automático de fotos com loop infinito
- História do casal apresentada de forma elegante
- Sistema de carrinho de presentes
- Copiar chave Pix com alerta automático
- Scroll automático para o topo das páginas
- Layout responsivo (funciona no celular)
- Interface moderna e leve

--------------------------------------------------

# Tecnologias utilizadas

- React
- JavaScript (ES6+)
- CSS3
- Context API (gerenciamento de carrinho)
- Vite
- HTML5

--------------------------------------------------

# Estrutura do Projeto

src/

assets/
images/
casal1.jpeg
casal2.jpg
casal3.jpg
...

components/
CarouselFotos.jsx
Carrinho.jsx
ProdutoCard.jsx

context/
CartContext.jsx

pages/
Home.jsx
Presentes.jsx

styles/
global.css

App.jsx
main.jsx

--------------------------------------------------

# Carrossel de Fotos

O carrossel possui animação automática contínua:

- Movimento lento
- Loop infinito
- Responsivo
- Efeito de zoom ao passar o mouse

As imagens estão armazenadas em:

src/assets/images/

Formatos utilizados:

- .jpg
- .jpeg
- .heic

OBS: recomenda-se converter .heic para .jpg para melhor compatibilidade com navegadores.

--------------------------------------------------

# Sistema de Carrinho

O carrinho utiliza Context API para armazenar os itens adicionados.

Arquivo responsável:

src/context/CartContext.jsx

Funções disponíveis:

addToCart(item)
Adiciona item ao carrinho

removeFromCart(index)
Remove item do carrinho

clearCart()
Limpa todo o carrinho

--------------------------------------------------

# Pagamento via Pix

O usuário pode copiar a chave Pix com um clique.

Exemplo de implementação:

function copiarPix() {

navigator.clipboard.writeText("SUA_CHAVE_PIX")

alert("Chave Pix copiada!")

}

--------------------------------------------------

# Scroll automático para o topo

Sempre que o usuário troca de página, o site volta automaticamente para o topo.

Isso melhora a experiência do usuário.

--------------------------------------------------

# Como rodar o projeto

1. Instalar dependências

npm install

2. Rodar o projeto

npm run dev

3. Acessar no navegador

http://localhost:5173

--------------------------------------------------

# Build para produção

npm run build

--------------------------------------------------

# Responsividade

O site foi otimizado para:

- celular
- tablet
- desktop

--------------------------------------------------

# Objetivo do projeto

Criar um ambiente digital onde amigos e familiares possam:

- conhecer a história do casal
- acompanhar os preparativos
- contribuir com presentes
- participar deste momento especial

--------------------------------------------------

# História do casal

Nossa história começou ainda jovens,
quando nos conhecemos na igreja.

O tempo nos afastou,
mas Deus já tinha um plano maior para nós.

Anos depois,
nos reencontramos em uma chamada de vídeo
e algo especial começou ali.

O Matheus passou a frequentar
a igreja da Kariny
e aos poucos fomos nos aproximando.

No dia 17 de abril de 2022
começamos nosso namoro.

Desde então seguimos construindo
nossa história com amor,
fé e propósito.

Agora estamos nos preparando
para o grande dia:

14 de novembro de 2026

Criamos esse espaço para compartilhar
nossa história
e, se você sentir no coração,
nos abençoar nesse momento tão especial.

--------------------------------------------------

# Melhorias futuras

- integração com whatsapp
- confirmação de presença
- contador regressivo para o casamento
- galeria com tela cheia
- animações adicionais
- painel administrativo

--------------------------------------------------

# Desenvolvido por

Matheus Fernando Ribeiro Martins

Projeto desenvolvido com dedicação para um momento muito especial.
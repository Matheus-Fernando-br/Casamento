// src/components/CarouselFotos.jsx

import casal1 from "../assets/images/casal1.jpeg"
import casal2 from "../assets/images/casal2.jpg"
import casal3 from "../assets/images/casal3.jpg"
import casal4 from "../assets/images/casal4.jpg"
import casal5 from "../assets/images/casal5.jpg"

import casal6 from "../assets/images/casal6.jpg"
import casal7 from "../assets/images/casal7.jpg"
import casal8 from "../assets/images/casal8.jpg"
import casal9 from "../assets/images/casal9.jpg"
import casal10 from "../assets/images/casal10.jpg"
import casal11 from "../assets/images/casal11.jpg"
import casal12 from "../assets/images/casal12.jpg"
import casal13 from "../assets/images/casal13.jpg"
import casal14 from "../assets/images/casal14.jpg"

import casal15 from "../assets/images/casal15.jpg"
import casal16 from "../assets/images/casal16.jpg"
import casal17 from "../assets/images/casal17.jpg"

import casal18 from "../assets/images/casal18.jpg"
import casal19 from "../assets/images/casal19.jpg"

export default function CarouselFotos(){

const fotos = [

{src: casal1, alt:"Foto do casal 1"},
{src: casal2, alt:"Foto do casal 2"},
{src: casal3, alt:"Foto do casal 3"},
{src: casal4, alt:"Foto do casal 4"},
{src: casal5, alt:"Foto do casal 5"},

{src: casal6, alt:"Foto do casal 6"},
{src: casal7, alt:"Foto do casal 7"},
{src: casal8, alt:"Foto do casal 8"},
{src: casal9, alt:"Foto do casal 9"},
{src: casal10, alt:"Foto do casal 10"},
{src: casal11, alt:"Foto do casal 11"},
{src: casal12, alt:"Foto do casal 12"},
{src: casal13, alt:"Foto do casal 13"},
{src: casal14, alt:"Foto do casal 14"},

{src: casal15, alt:"Foto do casal 15"},
{src: casal16, alt:"Foto do casal 16"},
{src: casal17, alt:"Foto do casal 17"},

{src: casal18, alt:"Foto do casal 18"},
{src: casal19, alt:"Foto do casal 19"}

]

/* duplicamos para criar loop infinito suave */
const fotosLoop = [...fotos,...fotos]

return(

<div className="section">

<h2 className="section-title">

Nossa história 📸

</h2>

<div className="carousel">

<div className="carousel-track">

{

fotosLoop.map((foto,index) => (

<img
key={index}
src={foto.src}
alt={foto.alt}
/>

))

}

</div>

</div>

<div className="historia" style={{margin:10}}>

<p>

Nossa história começou ainda jovens,
quando nos conhecemos na igreja 🤍

<br/><br/>

O tempo nos afastou,
mas Deus já tinha um plano maior para nós ✨

<br/><br/>

Anos depois,
nos reencontramos em uma chamada de vídeo 📱
e algo especial começou ali...

<br/><br/>

O Matheus passou a frequentar
a igreja da Kariny ⛪
e aos poucos fomos nos aproximando 💬❤️

<br/><br/>

No dia
<strong> 17 de abril de 2022 </strong>
começamos nosso namoro 💍

<br/><br/>

Desde então seguimos construindo
nossa história com amor,
fé e propósito 🙏

<br/><br/>

Agora estamos nos preparando
para o grande dia:

<strong> 14 de novembro de 2026 </strong> 👰🤵✨

<br/><br/>

Criamos esse espaço para compartilhar
nossa história
e, se você sentir no coração,
nos abençoar nesse momento tão especial 💖🎁

</p>

</div>

</div>

)

}
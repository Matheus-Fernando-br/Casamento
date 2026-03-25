import Navbar from "../components/Navbar"
import BotaoVoltar from "../components/BotaoVoltar"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export default function Pix(){

const { cart } = useCart()

const total = cart.reduce((acc,item)=> acc + item.preco ,0)

const [showAlert,setShowAlert] = useState(false)

return(

<>

<Navbar/>

<BotaoVoltar/>

<div className="pix-container">

<h1>

Pagamento via Pix 💸

</h1>

<div className="pix-box">

<p className="pix-total">

Valor selecionado:

<strong>

R$ {total.toFixed(2)}

</strong>

</p>

<div className="pix-key">

<p>

Chave Pix

</p>

<strong>

matheus1030br@gmail.com

</strong>

</div>

<p className="pix-info">

Após copiar a chave Pix e realizar o pagamento,
já estaremos contando com esse presente
com muito carinho 💖

</p>

<p className="pix-help">

Caso prefira,
você pode enviar qualquer valor simbólico
para nos abençoar 🙏

</p>

<button
className="primary-btn"
onClick={() => {

navigator.clipboard.writeText("matheus1030br@gmail.com")

setShowAlert(true)

setTimeout(()=>{

setShowAlert(false)

},2500)

}}
>

Copiar chave Pix

</button>

{
showAlert && (

<div className="pix-alert">

Chave Pix copiada ✅

</div>

)
}

</div>

</div>

</>

)

}
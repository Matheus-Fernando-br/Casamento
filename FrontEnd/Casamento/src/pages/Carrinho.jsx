import Navbar from "../components/Navbar"
import BotaoVoltar from "../components/BotaoVoltar"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Carrinho(){

const { cart, removeFromCart } = useCart()

const total = cart.reduce((acc,item)=> acc + item.preco ,0)

return(

<>

<Navbar/>

<BotaoVoltar/>

<div className="cart-container">

<h1>
Seu presente 💝
</h1>

<p className="cart-subtitle">

Veja os itens que você escolheu para nos abençoar

</p>

<div className="cart-box">

{

cart.length === 0 ?

<p className="empty">
Nenhum presente selecionado ainda
</p>

:

cart.map(item => (

<div
className="cart-item"
key={item.id}
>

<span>

{item.nome}

</span>

<div className="cart-actions">

<strong>

R$ {item.preco}

</strong>

<button
className="remove-btn"
onClick={() => removeFromCart(item.id)}
>

<i className="bi bi-trash"></i>

</button>

</div>

</div>

))

}

<hr/>

<div className="cart-total">

<span>Total</span>

<strong>

R$ {total.toFixed(2)}

</strong>

</div>
</div>

<p className="cart-help">

Caso o valor do presente seja alto,
você pode combinar com outra pessoa
para contribuir juntos 💛

Também é possível contribuir
com apenas uma parte do valor.

Toda ajuda será uma grande bênção
para o nosso casamento 🙏

</p>

<Link to="/pix">

<button className="primary-btn">

Ir para pagamento via Pix

</button>

</Link>

<p className="symbolic">

Você também pode doar qualquer valor simbólico 💖

</p>

</div>

</>

)

}
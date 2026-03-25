import { useNavigate } from "react-router-dom"

export default function FrasePix(){

const navigate = useNavigate()

return(

<div className="pix-highlight">

<div className="pix-content">

<h2>

💝 Presente em valor livre

</h2>

<p>

Se preferir, você pode nos abençoar
com qualquer valor simbólico.

Toda contribuição será recebida
com muito carinho ❤️

</p>

<button

className="pix-btn"
style={{background:"green"}}
onClick={() => navigate("/pix")}

>

Enviar valor via Pix

</button>

</div>

</div>

)

}
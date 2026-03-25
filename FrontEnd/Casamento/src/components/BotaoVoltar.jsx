import { useNavigate } from "react-router-dom"

export default function BotaoVoltar(){

  const navigate = useNavigate()

  return(

    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >

      ← voltar

    </button>

  )

}
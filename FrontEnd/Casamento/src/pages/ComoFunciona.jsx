import Navbar from "../components/Navbar"
import BotaoVoltar from "../components/BotaoVoltar"
import { useState } from "react"

export default function ComoFunciona(){

  const [open,setOpen] = useState(null)

  function toggle(index){

    setOpen(open === index ? null : index)

  }

  function Item({index,pergunta,resposta}){

    const active = open === index

    return(

      <div className="faq-item">

        <div
          className="faq-question"
          onClick={() => toggle(index)}
        >

          <h3>

            {pergunta}

          </h3>

          <i
            className={
              active
              ? "bi bi-arrow-right-square-fill icon rotate"
              : "bi bi-arrow-right-square-fill icon"
            }
          ></i>

        </div>

        <div
          className={
            active
            ? "faq-answer open"
            : "faq-answer"
          }
        >

          <p>

            {resposta}

          </p>

        </div>

      </div>

    )

  }

  return(

    <>

      <Navbar/>

      <BotaoVoltar/>

      <div className="faq">

        <div style={{marginBottom:40, lineHeight: 2}}>

          <h1>

            Como funciona ❓

          </h1>

          <p>

            Veja abaixo as principais dúvidas sobre os presentes.

          </p>

        </div>

        <Item
          index={1}
          pergunta="Preciso criar conta?"
          resposta="Não. O processo é simples e rápido, sem necessidade de cadastro."
        />

        <Item
          index={2}
          pergunta="Como envio o presente?"
          resposta="Escolha o presente desejado, copie a chave PIX e realize o pagamento."
        />

        <Item
          index={3}
          pergunta="Posso escolher mais de um presente?"
          resposta="Sim, você pode escolher quantos presentes desejar."
        />

        <Item
          index={4}
          pergunta="Posso enviar qualquer valor?"
          resposta="Sim, qualquer valor doado será muito bem aceito, desde que venha do coração!"
        />

      </div>

    </>

  )

}
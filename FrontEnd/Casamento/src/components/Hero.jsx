// src/components/Hero.jsx

import bg from "../assets/images/hero.jpeg";

export default function Hero(){

  return(

    <div
      className="hero"
      style={{ backgroundImage: `url(${bg})` }}
    >

      <div className="overlay"></div>

      <div className="hero-content">

        <h1>
          Matheus & Kariny 💍
        </h1>

        <p>
          Nosso casamento será dia 14 de Novembro 💖
        </p>

      </div>

    </div>

  )

}
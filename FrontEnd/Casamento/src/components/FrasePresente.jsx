// src/components/FrasePresente.jsx

import { useNavigate } from "react-router-dom";

export default function FrasePresente(){

  const navigate = useNavigate()

  return(

    <div className="gift-section" style={{textAlign: "center", margin: 40}}>
      <hr className="divider" />
      <h2>
        Nos abençoe com um presente 🎁
      </h2>

      <p>
        Sua presença já é um presente,
        mas se desejar nos abençoar,
        preparamos uma lista especial ❤️
      </p>

      <button
        className="primary-btn"
        onClick={() => navigate("/presentes")}
      >

        Ver lista de presentes

      </button>
      <hr className="divider" />
    </div>

  )

}
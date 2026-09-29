import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SecaoCha from "../components/SecaoCha";
import CarouselFotos from "../components/CarouselFotos";
import FrasePresente from "../components/FrasePresente";
import Faq from "../components/Faq";
import FrasePix from "../components/FrasePix";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <CarouselFotos />

      <SecaoCha />

      <FrasePresente />

      <Faq />

      <FrasePix />

      <footer className="site-footer">
        <p>Matheus & Kariny 💍</p>

        <Link to="/area-dos-noivos" className="area-noivos-button">
          Área dos Noivos
        </Link>
      </footer>
    </>
  );
}

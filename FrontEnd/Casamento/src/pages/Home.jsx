import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CarouselFotos from "../components/CarouselFotos";
import FrasePresente from "../components/FrasePresente";
import FrasePix from "../components/FrasePix";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <CarouselFotos />

      <FrasePresente />

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

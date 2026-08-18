import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Sistema from "./pages/Sistema.jsx";
import Clima from "./pages/Clima.jsx";
import FaleConosco from "./pages/FaleConosco.jsx";

const paginas = {
  "#/": { titulo: "AgroBoost | Home", Componente: Home },
  "#/sistema": {
    titulo: "AgroBoost - Consultor Agrícola Digital",
    Componente: Sistema,
  },
  "#/clima": { titulo: "AgroBoost | Clima", Componente: Clima },
  "#/fale-conosco": {
    titulo: "AgroBoost | Fale Conosco",
    Componente: FaleConosco,
  },
};

function rotaAtual() {
  return paginas[window.location.hash] ? window.location.hash : "#/";
}

export default function App() {
  const [rota, setRota] = useState(rotaAtual);

  useEffect(() => {
    const aoTrocarRota = () => {
      setRota(rotaAtual());
      window.scrollTo({ top: 0 });
    };

    window.addEventListener("hashchange", aoTrocarRota);
    return () => window.removeEventListener("hashchange", aoTrocarRota);
  }, []);

  useEffect(() => {
    document.title = paginas[rota].titulo;
  }, [rota]);

  const { Componente } = paginas[rota];

  return (
    <>
      <Header />
      <Componente />
    </>
  );
}

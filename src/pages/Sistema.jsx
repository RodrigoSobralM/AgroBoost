import { useState } from "react";
import Footer from "../components/Footer.jsx";
import ProgressSteps from "../components/ProgressSteps.jsx";
import Diagnostico from "../components/Diagnostico.jsx";
import Score from "../components/Score.jsx";
import Simulador from "../components/Simulador.jsx";
import Calendario from "../components/Calendario.jsx";
import { calcularBaseScore } from "../score.js";

export default function Sistema() {
  const [etapa, setEtapa] = useState(1);
  const [dados, setDados] = useState({ region: "", soil: "", crop: "" });
  const [praticasSelecionadas, setPraticasSelecionadas] = useState([]);

  const baseScore = calcularBaseScore(dados);

  function irParaEtapa(proxima) {
    if (proxima === 2 && (!dados.region || !dados.soil || !dados.crop)) {
      alert(
        "Por favor, responda todas as perguntas do diagnóstico para continuar.",
      );
      return;
    }

    if (proxima === 3) setPraticasSelecionadas([]);

    setEtapa(proxima);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selecionar(campo, valor) {
    setDados({ ...dados, [campo]: valor });
  }

  function alternarPratica(id) {
    setPraticasSelecionadas(
      praticasSelecionadas.includes(id)
        ? praticasSelecionadas.filter((item) => item !== id)
        : [...praticasSelecionadas, id],
    );
  }

  return (
    <>
      <ProgressSteps etapa={etapa} />

      <main className="system-main">
        {etapa === 1 && (
          <Diagnostico
            dados={dados}
            onSelecionar={selecionar}
            onAvancar={irParaEtapa}
          />
        )}

        {etapa === 2 && (
          <Score dados={dados} baseScore={baseScore} onIrPara={irParaEtapa} />
        )}

        {etapa === 3 && (
          <Simulador
            baseScore={baseScore}
            selecionadas={praticasSelecionadas}
            onAlternar={alternarPratica}
            onIrPara={irParaEtapa}
          />
        )}

        {etapa === 4 && (
          <Calendario
            dados={dados}
            selecionadas={praticasSelecionadas}
            onIrPara={irParaEtapa}
          />
        )}
      </main>

      <Footer subtitulo="PBL: AgroTech — Todos Contra a Fome (ODS 2.4)" />
    </>
  );
}

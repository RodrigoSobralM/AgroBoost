import Radar from "./Radar.jsx";
import { calcTotal } from "../score.js";

export const praticas = [
  {
    id: "plantio-direto",
    titulo: "Plantio Direto na Palha",
    descricao: "Mantém a cobertura do solo, evitando erosão e retendo umidade.",
    impacto: { soil: 30, water: 20, climate: 15, bio: 5 },
  },
  {
    id: "rotacao-culturas",
    titulo: "Rotação de Culturas",
    descricao:
      "Alternar espécies quebra o ciclo de pragas e devolve nutrientes.",
    impacto: { bio: 25, soil: 15, water: 0, climate: 10 },
  },
  {
    id: "gotejamento",
    titulo: "Irrigação por Gotejamento",
    descricao: "Leva água direto à raiz. Economiza até 60% de água.",
    impacto: { water: 35, climate: 20, soil: 0, bio: 0 },
  },
  {
    id: "controle-biologico",
    titulo: "Controle Biológico (MIP)",
    descricao: "Uso de inimigos naturais contra pragas, reduzindo agrotóxicos.",
    impacto: { bio: 30, climate: 10, soil: 10, water: 0 },
  },
];

function calcularProjecao(baseScore, selecionadas) {
  const projetado = { ...baseScore };

  praticas
    .filter((pratica) => selecionadas.includes(pratica.id))
    .forEach((pratica) => {
      projetado.water += pratica.impacto.water || 0;
      projetado.soil += pratica.impacto.soil || 0;
      projetado.bio += pratica.impacto.bio || 0;
      projetado.climate += pratica.impacto.climate || 0;
    });

  Object.keys(projetado).forEach((k) => {
    if (projetado[k] > 100) projetado[k] = 100;
  });

  return projetado;
}

export default function Simulador({
  baseScore,
  selecionadas,
  onAlternar,
  onIrPara,
}) {
  const projetado = calcularProjecao(baseScore, selecionadas);
  const totalAtual = calcTotal(baseScore);
  const totalProjetado = calcTotal(projetado);

  return (
    <section id="step-3" className="step-container active-step">
      <div className="panel">
        <h2 className="panel-title">
          <svg className="icon" viewBox="0 0 24 24">
            <polyline points="8 7 4 11 8 15" />
            <line x1="4" y1="11" x2="13" y2="11" />
            <polyline points="16 9 20 13 16 17" />
            <line x1="20" y1="13" x2="11" y2="13" />
          </svg>
          Simulador "E se?"
        </h2>

        <p className="panel-description">
          Selecione práticas sustentáveis abaixo e veja como elas impactam sua
          propriedade em tempo real.
        </p>

        <div className="sim-grid">
          <div>
            <h3 className="practice-title">Práticas Recomendadas</h3>

            <div className="practice-list">
              {praticas.map((pratica) => (
                <label key={pratica.id} className="practice-card">
                  <input
                    type="checkbox"
                    checked={selecionadas.includes(pratica.id)}
                    onChange={() => onAlternar(pratica.id)}
                  />
                  <span>
                    <strong>{pratica.titulo}</strong>
                    <p>{pratica.descricao}</p>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="sim-results">
            <div className="sim-panel current">
              <h4>Cenário Atual</h4>
              <div className="sim-score">{totalAtual}</div>
              <div className="chart-small">
                <Radar
                  valores={[
                    baseScore.water,
                    baseScore.soil,
                    baseScore.bio,
                    baseScore.climate,
                  ]}
                  cor="#9ca3af"
                />
              </div>
            </div>

            <div className="sim-panel projected">
              <h4>Cenário Projetado</h4>
              <div className="sim-score projected">
                {totalProjetado}
                {totalProjetado > totalAtual && (
                  <svg className="icon trend-up" viewBox="0 0 24 24">
                    <polyline points="3 17 9 11 13 15 21 7" />
                    <polyline points="15 7 21 7 21 13" />
                  </svg>
                )}
              </div>
              <div className="chart-small">
                <Radar
                  valores={[
                    projetado.water,
                    projetado.soil,
                    projetado.bio,
                    projetado.climate,
                  ]}
                  cor="#4caf50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="actions between">
          <button
            type="button"
            onClick={() => onIrPara(2)}
            className="btn btn-ghost"
          >
            <svg className="icon" viewBox="0 0 24 24">
              <line x1="20" y1="12" x2="5" y2="12" />
              <polyline points="11 6 5 12 11 18" />
            </svg>
            Voltar
          </button>

          <button
            type="button"
            onClick={() => onIrPara(4)}
            className="btn btn-main"
          >
            Gerar Calendário
            <svg className="icon" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <polyline points="9 14 11 16 15 12" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

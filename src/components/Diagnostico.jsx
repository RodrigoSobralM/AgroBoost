const regioes = [
  { valor: "Norte", texto: "Norte" },
  { valor: "Nordeste", texto: "Nordeste" },
  { valor: "Centro-Oeste", texto: "C-Oeste" },
  { valor: "Sudeste", texto: "Sudeste" },
  { valor: "Sul", texto: "Sul" },
];

const iconeSolo = (
  <>
    <path d="M2 18c3 0 4-7 10-7s7 7 10 7" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </>
);

const iconeBroto = (
  <>
    <path d="M12 20v-7" />
    <path d="M12 13c-1-4-4-5-7-5 0 4 3 6 7 5Z" />
    <path d="M12 11c1-3 4-4 6-4 0 3-3 5-6 4Z" />
  </>
);

const iconeHortalica = (
  <>
    <path d="M4 20c0-6 5-11 11-12-1 6-5 11-11 12Z" />
    <path d="M15 8c1-2 3-3 5-3" />
    <path d="M15 8c0-2-1-4-1-5" />
    <path d="M15 8c2 0 4-1 5-2" />
  </>
);

const solos = [
  { valor: "Arenoso", texto: "Arenoso (Retém pouca água)", cor: "icon-yellow" },
  {
    valor: "Argiloso",
    texto: "Argiloso (Terra vermelha/barro)",
    cor: "icon-red",
  },
  { valor: "Misto", texto: "Misto (Equilibrado)", cor: "icon-brown" },
];

const culturas = [
  { valor: "Milho", cor: "icon-yellow", icone: iconeBroto },
  { valor: "Feijão", cor: "icon-brown", icone: iconeBroto },
  { valor: "Soja", cor: "icon-green", icone: iconeBroto },
  { valor: "Hortaliças", cor: "icon-orange", icone: iconeHortalica },
];

export default function Diagnostico({ dados, onSelecionar, onAvancar }) {
  return (
    <section id="step-1" className="step-container active-step">
      <div className="panel">
        <h2 className="panel-title">
          <svg className="icon" viewBox="0 0 24 24">
            <rect x="5" y="4" width="14" height="17" rx="2" />
            <rect x="9" y="2.5" width="6" height="3" rx="1" />
            <path d="M10.3 10.5a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1" />
            <line x1="12" y1="16.5" x2="12" y2="16.5" />
          </svg>
          Diagnóstico da Propriedade
        </h2>

        <p className="panel-description">
          Vamos entender a realidade da sua terra para oferecer as melhores
          recomendações.
        </p>

        <form className="diagnostic-form">
          <div>
            <h3 className="question-title">
              1. Qual a região da sua propriedade?
            </h3>

            <div className="option-grid region-grid">
              {regioes.map((regiao) => (
                <label key={regiao.valor} className="option-label">
                  <input
                    type="radio"
                    name="region"
                    value={regiao.valor}
                    className="radio-card"
                    checked={dados.region === regiao.valor}
                    onChange={() => onSelecionar("region", regiao.valor)}
                  />
                  <div className="option-card">{regiao.texto}</div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="question-title">
              2. Qual o tipo de solo predominante?
            </h3>

            <div className="option-grid soil-grid">
              {solos.map((solo) => (
                <label key={solo.valor} className="option-label">
                  <input
                    type="radio"
                    name="soil"
                    value={solo.valor}
                    className="radio-card"
                    checked={dados.soil === solo.valor}
                    onChange={() => onSelecionar("soil", solo.valor)}
                  />
                  <div className="option-card vertical">
                    <svg className={`icon ${solo.cor}`} viewBox="0 0 24 24">
                      {iconeSolo}
                    </svg>
                    <span>{solo.texto}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="question-title">
              3. Qual a principal cultura (plantação)?
            </h3>

            <div className="option-grid crop-grid">
              {culturas.map((cultura) => (
                <label key={cultura.valor} className="option-label">
                  <input
                    type="radio"
                    name="crop"
                    value={cultura.valor}
                    className="radio-card"
                    checked={dados.crop === cultura.valor}
                    onChange={() => onSelecionar("crop", cultura.valor)}
                  />
                  <div className="option-card vertical">
                    <svg className={`icon ${cultura.cor}`} viewBox="0 0 24 24">
                      {cultura.icone}
                    </svg>
                    {cultura.valor}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="actions end">
            <button
              type="button"
              onClick={() => onAvancar(2)}
              className="btn btn-main"
            >
              Gerar Score
              <svg className="icon" viewBox="0 0 24 24">
                <line x1="4" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

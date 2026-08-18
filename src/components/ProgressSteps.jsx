const etapas = ["Diagnóstico", "Score", "Simulador", "Calendário"];

export default function ProgressSteps({ etapa }) {
  return (
    <div className="progress-shell">
      <div className="container progress-inner">
        <div className="progress-list">
          <div className="progress-track"></div>
          <div
            className="progress-fill"
            style={{ width: `${((etapa - 1) / 3) * 100}%` }}
          ></div>

          {etapas.map((nome, i) => {
            const completa = i + 1 <= etapa;

            return (
              <div
                key={nome}
                className={`progress-step${completa ? " is-complete" : ""}`}
              >
                <div
                  className={`progress-badge${completa ? " is-complete" : ""}`}
                >
                  {i + 1}
                </div>
                <span className="progress-label">{nome}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

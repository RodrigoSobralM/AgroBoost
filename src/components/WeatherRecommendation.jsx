const classesDeRisco = {
  Baixo: "risk-low",
  Moderado: "risk-medium",
  Alto: "risk-high",
};

export default function WeatherRecommendation({ risco, mensagens }) {
  return (
    <div className="panel">
      <h3 className="practice-title">Recomendação AgroBoost</h3>

      <p className={`risk-badge ${classesDeRisco[risco]}`}>
        Nível de risco: {risco}
      </p>

      <ul className="recommendation-list">
        {mensagens.map((mensagem) => (
          <li key={mensagem}>{mensagem}</li>
        ))}
      </ul>

      <small className="recommendation-note">
        Orientações de caráter acadêmico, geradas a partir de regras simples.
        Não substituem avaliação técnica agronômica.
      </small>
    </div>
  );
}

import { descricaoTempo, diaDaSemana } from "../clima.js";

export default function WeatherForecast({ dias }) {
  return (
    <div className="panel">
      <h3 className="practice-title">Previsão</h3>

      <div className="forecast-grid">
        {dias.map((dia) => (
          <div key={dia.data} className="forecast-card">
            <p className="forecast-day">{diaDaSemana(dia.data)}</p>
            <p className="forecast-condition">{descricaoTempo(dia.codigo)}</p>
            <p className="forecast-temp">
              {Math.round(dia.maxima)}° / {Math.round(dia.minima)}°
            </p>
            <p className="forecast-rain">{dia.precipitacao} mm</p>
          </div>
        ))}
      </div>
    </div>
  );
}

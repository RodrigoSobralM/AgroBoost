import WeatherMetric from "./WeatherMetric.jsx";
import { descricaoTempo } from "../clima.js";

const iconeTemperatura = (
  <>
    <path d="M10 13V5a2 2 0 0 1 4 0v8a4 4 0 1 1-4 0Z" />
    <line x1="12" y1="9" x2="12" y2="15" />
  </>
);

const iconeGota = <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />;

const iconeChuva = (
  <>
    <path d="M7 15a4 4 0 0 1 .5-8 5 5 0 0 1 9.3 1.2A3.5 3.5 0 0 1 17 15H7Z" />
    <line x1="9" y1="18" x2="8" y2="21" />
    <line x1="13" y1="18" x2="12" y2="21" />
    <line x1="17" y1="18" x2="16" y2="21" />
  </>
);

const iconeVento = (
  <>
    <path d="M3 8h9a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M3 12h13a2.5 2.5 0 1 1-2.5 2.5" />
    <path d="M3 16h7" />
  </>
);

export default function WeatherCurrent({ local, atual, chuvaPrevista }) {
  const regiao = [local.admin1, local.pais].filter(Boolean).join(", ");

  return (
    <div className="panel">
      <h2 className="panel-title">
        <svg className="icon" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
        </svg>
        {local.nome}
      </h2>

      <p className="panel-description">
        {regiao ? `${regiao} · ` : ""}
        {descricaoTempo(atual.codigo)}
      </p>

      <div className="weather-metrics">
        <WeatherMetric
          icone={iconeTemperatura}
          rotulo="Temperatura"
          valor={`${Math.round(atual.temperatura)} °C`}
        />
        <WeatherMetric
          icone={iconeGota}
          rotulo="Umidade"
          valor={`${Math.round(atual.umidade)}%`}
        />
        <WeatherMetric
          icone={iconeChuva}
          rotulo="Chuva prevista"
          valor={`${chuvaPrevista} mm`}
        />
        <WeatherMetric
          icone={iconeVento}
          rotulo="Vento"
          valor={`${Math.round(atual.vento)} km/h`}
        />
      </div>
    </div>
  );
}

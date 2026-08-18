export default function WeatherMetric({ icone, rotulo, valor }) {
  return (
    <div className="weather-metric">
      <svg className="icon" viewBox="0 0 24 24">
        {icone}
      </svg>
      <p className="weather-metric-label">{rotulo}</p>
      <p className="weather-metric-value">{valor}</p>
    </div>
  );
}

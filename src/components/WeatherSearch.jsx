export default function WeatherSearch({
  cidade,
  onCidadeChange,
  onBuscar,
  carregando,
}) {
  function aoEnviar(event) {
    event.preventDefault();
    onBuscar();
  }

  return (
    <form className="weather-search" onSubmit={aoEnviar}>
      <div className="form-group">
        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          className="field"
          type="text"
          placeholder="Ex.: Ribeirão Preto"
          value={cidade}
          onChange={(event) => onCidadeChange(event.target.value)}
        />
      </div>

      <button className="btn btn-main" type="submit" disabled={carregando}>
        Consultar
        <svg className="icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <line x1="16" y1="16" x2="21" y2="21" />
        </svg>
      </button>
    </form>
  );
}

import { useState } from "react";
import Footer from "../components/Footer.jsx";
import WeatherSearch from "../components/WeatherSearch.jsx";
import WeatherCurrent from "../components/WeatherCurrent.jsx";
import WeatherForecast from "../components/WeatherForecast.jsx";
import WeatherRecommendation from "../components/WeatherRecommendation.jsx";
import { avaliarClima } from "../clima.js";

const erroCidade = "Não foi possível localizar essa cidade.";
const erroApi = "Não foi possível obter os dados climáticos. Tente novamente.";

async function buscarLocal(cidade) {
  const resposta = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cidade,
    )}&count=1&language=pt&format=json`,
  );

  if (!resposta.ok) throw new Error(erroApi);

  const dados = await resposta.json();

  return dados.results?.[0] || null;
}

async function buscarPrevisao(latitude, longitude) {
  const resposta = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      "&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m" +
      "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum" +
      "&timezone=auto&forecast_days=5",
  );

  if (!resposta.ok) throw new Error(erroApi);

  return resposta.json();
}

export default function Clima() {
  const [cidade, setCidade] = useState("");
  const [local, setLocal] = useState(null);
  const [atual, setAtual] = useState(null);
  const [dias, setDias] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function consultar() {
    if (!cidade.trim()) return;

    setCarregando(true);
    setErro("");
    setLocal(null);
    setAtual(null);
    setDias([]);

    try {
      const encontrado = await buscarLocal(cidade.trim());

      if (!encontrado) {
        setErro(erroCidade);
        return;
      }

      const previsao = await buscarPrevisao(
        encontrado.latitude,
        encontrado.longitude,
      );

      setLocal({
        nome: encontrado.name,
        admin1: encontrado.admin1,
        pais: encontrado.country,
      });

      setAtual({
        temperatura: previsao.current.temperature_2m,
        umidade: previsao.current.relative_humidity_2m,
        precipitacao: previsao.current.precipitation,
        vento: previsao.current.wind_speed_10m,
        codigo: previsao.current.weather_code,
      });

      setDias(
        previsao.daily.time.map((data, i) => ({
          data,
          codigo: previsao.daily.weather_code[i],
          maxima: previsao.daily.temperature_2m_max[i],
          minima: previsao.daily.temperature_2m_min[i],
          precipitacao: previsao.daily.precipitation_sum[i],
        })),
      );
    } catch {
      setErro(erroApi);
    } finally {
      setCarregando(false);
    }
  }

  const avaliacao = atual && dias.length ? avaliarClima(atual, dias) : null;

  return (
    <>
      <main className="system-main">
        <div className="page-heading">
          <h2 className="page-title">Monitor Agroclimático</h2>
          <p className="page-description">
            Consulte as condições climáticas da sua região e receba orientações
            para o planejamento da propriedade.
          </p>
        </div>

        <div className="weather-stack">
          <div className="panel">
            <WeatherSearch
              cidade={cidade}
              onCidadeChange={setCidade}
              onBuscar={consultar}
              carregando={carregando}
            />

            {carregando && (
              <p className="weather-status">
                Consultando condições climáticas...
              </p>
            )}

            {erro && <p className="weather-status is-error">{erro}</p>}
          </div>

          {local && atual && (
            <WeatherCurrent
              local={local}
              atual={atual}
              chuvaPrevista={dias[0].precipitacao}
            />
          )}

          {dias.length > 0 && <WeatherForecast dias={dias} />}

          {avaliacao && (
            <WeatherRecommendation
              risco={avaliacao.risco}
              mensagens={avaliacao.mensagens}
            />
          )}
        </div>
      </main>

      <Footer subtitulo="PBL: AgroTech — Todos Contra a Fome" />
    </>
  );
}

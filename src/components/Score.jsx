import { useEffect, useState } from "react";
import Radar from "./Radar.jsx";
import { calcTotal } from "../score.js";

export default function Score({ dados, baseScore, onIrPara }) {
  const total = calcTotal(baseScore);
  const [totalExibido, setTotalExibido] = useState(0);

  useEffect(() => {
    let inicio = null;
    let frame;

    const passo = (timestamp) => {
      if (!inicio) inicio = timestamp;

      const progresso = Math.min((timestamp - inicio) / 1000, 1);
      setTotalExibido(Math.floor(progresso * total));

      if (progresso < 1) frame = window.requestAnimationFrame(passo);
    };

    frame = window.requestAnimationFrame(passo);
    return () => window.cancelAnimationFrame(frame);
  }, [total]);

  return (
    <section id="step-2" className="step-container active-step">
      <div className="panel">
        <div className="score-header">
          <div className="score-header-text">
            <h2 className="panel-title">
              <svg className="icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="12" x2="12" y2="3" />
                <line x1="12" y1="12" x2="21" y2="12" />
              </svg>
              Seu Score de Sustentabilidade
            </h2>
            <p>
              Baseado no seu perfil:{" "}
              <span className="profile-text">
                {`${dados.crop} no ${dados.soil} (${dados.region})`}
              </span>
            </p>
          </div>

          <div className="score-box">
            <p className="score-label">Pontuação Geral</p>
            <p className="score-total">{totalExibido}</p>
            <p className="score-limit">de 100</p>
          </div>
        </div>

        <div className="score-grid">
          <div className="chart-box">
            <Radar
              valores={[
                baseScore.water,
                baseScore.soil,
                baseScore.bio,
                baseScore.climate,
              ]}
              cor="#fbc02d"
            />
          </div>

          <div className="info-stack">
            <div className="metric-card water">
              <h4>
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
                </svg>
                Eficiência Hídrica
              </h4>
              <p>Sua capacidade de reter água no solo e otimizar irrigação.</p>
            </div>

            <div className="metric-card soil">
              <h4>
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M2 18c3 0 4-7 10-7s7 7 10 7" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
                Saúde do Solo
              </h4>
              <p>Nível de proteção contra erosão e manutenção de nutrientes.</p>
            </div>

            <div className="metric-card bio">
              <h4>
                <svg className="icon" viewBox="0 0 24 24">
                  <rect x="8" y="9" width="8" height="10" rx="4" />
                  <path d="M9 5l1.5 2M15 5l-1.5 2" />
                  <line x1="8" y1="13" x2="3" y2="13" />
                  <line x1="16" y1="13" x2="21" y2="13" />
                  <path d="M8 10L4 8M16 10l4-2M8 16l-4 2M16 16l4 2" />
                </svg>
                Biodiversidade
              </h4>
              <p>Equilíbrio do ecossistema e controle natural de pragas.</p>
            </div>

            <div className="metric-card climate">
              <h4>
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M10 13V5a2 2 0 0 1 4 0v8a4 4 0 1 1-4 0Z" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
                Resiliência Climática
              </h4>
              <p>Capacidade da lavoura resistir a secas ou chuvas extremas.</p>
            </div>
          </div>
        </div>

        <div className="actions between">
          <button
            type="button"
            onClick={() => onIrPara(1)}
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
            onClick={() => onIrPara(3)}
            className="btn btn-accent"
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M9 3h6" />
              <path d="M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
              <line x1="8" y1="15" x2="16" y2="15" />
            </svg>
            Simular Melhorias
          </button>
        </div>
      </div>
    </section>
  );
}

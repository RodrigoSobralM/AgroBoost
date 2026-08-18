import Footer from "../components/Footer.jsx";

const pitchVideoId = "JSBZ24ADRL0";

export default function Home() {
  return (
    <>
      <main>
        <section id="home" className="hero">
          <div className="container home-grid">
            <div>
              <p className="eyebrow">ODS 2.4</p>

              <h2 className="hero-title">
                Tecnologia para uma agricultura mais sustentável
              </h2>

              <p className="hero-text">
                Receba diagnósticos inteligentes, score de sustentabilidade,
                simulações e calendário agrícola personalizado.
              </p>

              <div className="hero-actions">
                <a href="#/sistema" className="button-primary">
                  Solicitar Demonstração
                </a>
              </div>
            </div>

            <div className="feature-panel">
              <div className="feature-grid">
                <div className="feature-tile">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M12 20v-7" />
                    <path d="M12 13c-1-4-4-5-7-5 0 4 3 6 7 5Z" />
                    <path d="M12 11c1-3 4-4 6-4 0 3-3 5-6 4Z" />
                  </svg>
                  <p>Diagnóstico</p>
                </div>

                <div className="feature-tile">
                  <svg className="icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="12" y1="12" x2="12" y2="3" />
                    <line x1="12" y1="12" x2="21" y2="12" />
                  </svg>
                  <p>Score</p>
                </div>

                <div className="feature-tile">
                  <svg className="icon" viewBox="0 0 24 24">
                    <path d="M9 3h6" />
                    <path d="M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
                    <line x1="8" y1="15" x2="16" y2="15" />
                  </svg>
                  <p>Simulador</p>
                </div>

                <div className="feature-tile">
                  <svg className="icon" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                  </svg>
                  <p>Calendário</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section container">
          <h3 className="section-title">Como o AgroBoost ajuda</h3>

          <div className="benefit-grid">
            <div className="benefit-card">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
              </svg>

              <h4>Eficiência Hídrica</h4>

              <p>Redução de desperdício e melhor uso inteligente da irrigação.</p>
            </div>

            <div className="benefit-card">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M2 18c3 0 4-7 10-7s7 7 10 7" />
                <line x1="2" y1="20" x2="22" y2="20" />
              </svg>

              <h4>Saúde do Solo</h4>

              <p>
                Boas práticas para manter nutrientes e elevar a produtividade.
              </p>
            </div>

            <div className="benefit-card">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M10 13V5a2 2 0 0 1 4 0v8a4 4 0 1 1-4 0Z" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>

              <h4>Resiliência Climática</h4>

              <p>
                Planejamento agrícola para secas, chuvas extremas e mudanças
                climáticas.
              </p>
            </div>
          </div>
        </section>

        <section id="pitch" className="section pitch-section">
          <div className="container">
            <div className="pitch-content">
              <p className="eyebrow">Pitch do Projeto</p>

              <h3 className="section-title">Conheça o AgroBoost em ação</h3>

              <p className="pitch-text">
                Assista ao vídeo de apresentação e descubra como o AgroBoost
                utiliza tecnologia para apoiar produtores rurais na agricultura
                sustentável, aumentando produtividade e reduzindo impactos
                ambientais.
              </p>

              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${pitchVideoId}`}
                  title="Pitch AgroBoost"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="pitch-actions">
                <a
                  href={`https://youtu.be/${pitchVideoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary"
                >
                  <svg className="icon" viewBox="0 0 24 24">
                    <rect x="2" y="6" width="20" height="12" rx="4" />
                    <path
                      d="M10 9l6 3-6 3V9Z"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                  Assistir no YouTube
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer subtitulo="PBL: AgroTech — Todos Contra a Fome" />
    </>
  );
}

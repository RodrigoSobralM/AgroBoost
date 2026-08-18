import { useEffect, useState } from "react";

const icones = {
  tractor: (
    <>
      <circle cx="7" cy="16" r="3.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M4 13V8h6l2 5" />
      <path d="M12 13h4l2-3" />
      <path d="M10 8V6h3" />
    </>
  ),
  seedling: (
    <>
      <path d="M12 20v-7" />
      <path d="M12 13c-1-4-4-5-7-5 0 4 3 6 7 5Z" />
      <path d="M12 11c1-3 4-4 6-4 0 3-3 5-6 4Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-7 5-13 14-14 1 9-5 15-14 14Z" />
      <path d="M5 19c3-5 7-8 11-9" />
    </>
  ),
  wheat: (
    <>
      <line x1="12" y1="21" x2="12" y2="10" />
      <path d="M12 10c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 10c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5ZM12 14c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 14c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5ZM12 7c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 7c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5Z" />
    </>
  ),
};

function montarEventos(dados, selecionadas) {
  const temPlantioDireto = selecionadas.includes("plantio-direto");
  const temIrrigacao = selecionadas.includes("gotejamento");

  return [
    {
      month: "Setembro - Outubro",
      title: "Preparo Sustentável do Solo",
      icon: "tractor",
      color: "icon-brown",
      dot: "dot-amber",
      desc: temPlantioDireto
        ? "Manter a palhada da cultura anterior no solo. NÃO arar. Fazer dessecação química focada apenas onde for plantar."
        : "Preparo mínimo do solo. Fazer análise de solo e correção com calcário se necessário.",
    },
    {
      month: "Novembro - Dezembro",
      title: `Plantio de ${dados.crop}`,
      icon: "seedling",
      color: "icon-green",
      dot: "dot-green",
      desc: `Semeadura do ${dados.crop} aproveitando o início das chuvas na região ${dados.region}. Garantir espaçamento adequado para evitar competição por luz.`,
    },
    {
      month: "Janeiro - Fevereiro",
      title: "Manejo e Crescimento",
      icon: "leaf",
      color: "icon-green",
      dot: "dot-light",
      desc: temIrrigacao
        ? "Ativar sistema de gotejamento apenas nos horários mais frescos (início da manhã ou fim da tarde). Monitorar pragas semanalmente."
        : "Manter controle de ervas daninhas. Monitorar pragas semanalmente. O solo coberto ajudará a reter a água das chuvas.",
    },
    {
      month: "Março - Abril",
      title: "Colheita e Pós-Colheita",
      icon: "wheat",
      color: "icon-yellow",
      dot: "dot-yellow",
      desc: `Realizar a colheita do ${dados.crop}. Importante: Deixar os restos culturais no campo para proteger o solo para a próxima safra.`,
    },
  ];
}

function formatarDataBrasileira(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano}, ${hora}:${minuto}`;
}

export default function Calendario({ dados, selecionadas, onIrPara }) {
  const [dataImpressao, setDataImpressao] = useState("--/--/----, --:--");
  const [imprimindo, setImprimindo] = useState(false);

  useEffect(() => {
    if (!imprimindo) return;

    const tituloOriginal = document.title;

    document.title = " ";
    window.print();
    document.title = tituloOriginal;

    setImprimindo(false);
  }, [imprimindo]);

  function gerarPDF() {
    setDataImpressao(formatarDataBrasileira(new Date()));
    setImprimindo(true);
  }

  return (
    <section id="step-4" className="step-container active-step">
      <div className="panel">
        <div className="print-header">
          <p className="print-brand">AgroBoost</p>
          <h1>Plano de Ação Sustentável</h1>
          <p className="print-date">Gerado em {dataImpressao}</p>
        </div>

        <div className="plan-intro">
          <h2>
            <svg className="icon" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
            Seu Plano de Ação
          </h2>
          <p>
            Com base no seu cultivo de{" "}
            <span className="highlight">{dados.crop}</span> e nas práticas
            simuladas, este é o seu calendário anual recomendado para maior
            produtividade e sustentabilidade.
          </p>
        </div>

        <div className="timeline">
          {montarEventos(dados, selecionadas).map((evento) => (
            <div key={evento.month} className="timeline-item">
              <div className="timeline-row">
                <div className="timeline-month-desktop">{evento.month}</div>
                <div className={`timeline-dot ${evento.dot}`}></div>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <span className="timeline-month-mobile">{evento.month}</span>
                    <h4>
                      <svg
                        className={`icon ${evento.color}`}
                        viewBox="0 0 24 24"
                      >
                        {icones[evento.icon]}
                      </svg>
                      {evento.title}
                    </h4>
                    <p>{evento.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="share-box">
          <div className="share-icon">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M12 3v12" />
              <polyline points="7 11 12 16 17 11" />
              <path d="M5 20h14" />
            </svg>
          </div>

          <div className="share-text">
            <h4>Salvar ou Compartilhar</h4>
            <p>
              Baixe este plano em PDF para consultar offline ou envie para o
              WhatsApp do agricultor.
            </p>
            <small className="print-help">
              Se aparecer data, link ou numeração no PDF, desmarque "Cabeçalhos
              e rodapés" na tela de impressão.
            </small>
          </div>

          <div className="share-actions">
            <button className="btn btn-outline-blue" type="button">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M3.5 20.5l1.3-3.8A8 8 0 1 1 8 19.7l-4.5.8Z" />
                <path
                  d="M9 9c0 4 2 6 6 6 .8 0 1.2-.6 1.2-1.4l-2-1-1 1c-1 0-2.3-1.3-2.3-2.3l1-1-1-2c-.8 0-1.9.4-1.9 1.7Z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Enviar
            </button>
            <button className="btn btn-blue" type="button" onClick={gerarPDF}>
              Gerar PDF
            </button>
          </div>
        </div>

        <div className="actions start">
          <button
            type="button"
            onClick={() => onIrPara(1)}
            className="btn btn-link"
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M4 12a8 8 0 1 0 2.3-5.6" />
              <polyline points="4 4 4 8 8 8" />
            </svg>
            Refazer Diagnóstico
          </button>
        </div>
      </div>
    </section>
  );
}

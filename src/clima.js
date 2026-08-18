const descricoes = {
  0: "Céu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro com geada",
  51: "Garoa fraca",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante",
  57: "Garoa congelante intensa",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante",
  67: "Chuva congelante forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve forte",
  77: "Grãos de neve",
  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  85: "Pancadas de neve fracas",
  86: "Pancadas de neve fortes",
  95: "Tempestade",
  96: "Tempestade com granizo",
  99: "Tempestade com granizo forte",
};

const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function descricaoTempo(codigo) {
  return descricoes[codigo] || "Condição não informada";
}

export function diaDaSemana(dataISO) {
  return diasDaSemana[new Date(`${dataISO}T00:00:00`).getDay()];
}

export function avaliarClima(atual, dias) {
  const chuvaPrevista = dias[0].precipitacao;
  const mensagens = [];

  if (chuvaPrevista >= 10) {
    mensagens.push(
      "Há previsão de chuva. Considere reduzir ou adiar a irrigação para evitar desperdício de água.",
    );
  }

  if (atual.temperatura >= 32) {
    mensagens.push(
      "Temperaturas elevadas podem aumentar a necessidade hídrica da cultura. Considere acompanhar a umidade do solo.",
    );
  }

  if (atual.vento >= 25) {
    mensagens.push(
      "Ventos fortes podem prejudicar determinadas aplicações agrícolas. Avalie as condições antes de realizar pulverizações.",
    );
  }

  if (!mensagens.length) {
    mensagens.push(
      "As condições climáticas atuais não indicam alertas relevantes. Continue acompanhando a previsão para planejar as atividades da propriedade.",
    );
  }

  const condicaoExtrema =
    chuvaPrevista >= 30 || atual.vento >= 40 || atual.temperatura >= 38;
  const condicaoDeAtencao =
    chuvaPrevista >= 10 || atual.temperatura >= 32 || atual.vento >= 25;

  let risco = "Baixo";
  if (condicaoExtrema) risco = "Alto";
  else if (condicaoDeAtencao) risco = "Moderado";

  return { risco, mensagens };
}

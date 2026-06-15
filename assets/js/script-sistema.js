let currentData = {
  region: "",
  soil: "",
  crop: "",
};

let baseScore = { water: 30, soil: 40, bio: 30, climate: 35 };
let projectedScore = { ...baseScore };

function goToStep(step) {
  if (step === 2) {
    const region = document.querySelector('input[name="region"]:checked');
    const soil = document.querySelector('input[name="soil"]:checked');
    const crop = document.querySelector('input[name="crop"]:checked');

    if (!region || !soil || !crop) {
      alert(
        "Por favor, responda todas as perguntas do diagnóstico para continuar.",
      );
      return;
    }

    currentData.region = region.value;
    currentData.soil = soil.value;
    currentData.crop = crop.value;

    document.getElementById("perfil-resumo").innerText =
      `${currentData.crop} no ${currentData.soil} (${currentData.region})`;
    document.getElementById("cal-cultura").innerText = currentData.crop;

    calculateBaseScore();
  }

  if (step === 3) {
    initSimulator();
  }

  if (step === 4) {
    generateCalendar();
  }

  document.querySelectorAll(".step-container").forEach((el) => {
    el.classList.remove("active-step");
    el.classList.add("hidden-step");
  });

  document.getElementById(`step-${step}`).classList.remove("hidden-step");
  document.getElementById(`step-${step}`).classList.add("active-step");

  document.getElementById("progress-bar").style.width =
    `${((step - 1) / 3) * 100}%`;

  for (let i = 1; i <= 4; i++) {
    const badge = document.getElementById(`badge-${i}`);
    const progressStep = document.getElementById(`progress-step-${i}`);

    if (i <= step) {
      badge.classList.add("is-complete");
      progressStep.classList.add("is-complete");
    } else {
      badge.classList.remove("is-complete");
      progressStep.classList.remove("is-complete");
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function coordenadaRadar(centro, raio, indice, valor) {
  const angulo = (-90 + indice * 90) * (Math.PI / 180);
  const distancia = (valor / 100) * raio;

  return {
    x: Math.round((centro + distancia * Math.cos(angulo)) * 10) / 10,
    y: Math.round((centro + distancia * Math.sin(angulo)) * 10) / 10,
  };
}

function desenharRadar(id, valores, cor) {
  const centro = 130;
  const raio = 85;
  const eixos = ["Água", "Solo", "Biodiversidade", "Clima"];

  let grade = "";
  [25, 50, 75, 100].forEach((nivel) => {
    const anel = eixos
      .map((_, i) => {
        const p = coordenadaRadar(centro, raio, i, nivel);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    grade += `<polygon points="${anel}" fill="none" stroke="rgba(0, 0, 0, 0.1)" />`;
  });

  let linhas = "";
  let rotulos = "";
  eixos.forEach((nome, i) => {
    const ponta = coordenadaRadar(centro, raio, i, 100);
    linhas += `<line x1="${centro}" y1="${centro}" x2="${ponta.x}" y2="${ponta.y}" stroke="rgba(0, 0, 0, 0.1)" />`;

    const rotulo = coordenadaRadar(centro, raio + 18, i, 100);
    rotulos += `<text x="${rotulo.x}" y="${rotulo.y}" text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="bold" fill="#4b5563">${nome}</text>`;
  });

  const area = valores
    .map((valor, i) => {
      const p = coordenadaRadar(centro, raio, i, valor);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  let pontos = "";
  valores.forEach((valor, i) => {
    const p = coordenadaRadar(centro, raio, i, valor);
    pontos += `<circle cx="${p.x}" cy="${p.y}" r="3" fill="${cor}" />`;
  });

  document.getElementById(id).innerHTML =
    `<svg viewBox="0 0 260 260" class="radar-svg">${grade}${linhas}` +
    `<polygon points="${area}" fill="${cor}" fill-opacity="0.25" stroke="${cor}" stroke-width="2" />` +
    `${pontos}${rotulos}</svg>`;
}

function calcTotal(scoreObj) {
  return Math.round(
    (scoreObj.water + scoreObj.soil + scoreObj.bio + scoreObj.climate) / 4,
  );
}

function calculateBaseScore() {
  baseScore = { water: 50, soil: 50, bio: 40, climate: 40 };

  if (currentData.soil === "Arenoso") baseScore.water -= 20;

  if (currentData.soil === "Argiloso") {
    baseScore.water += 10;
    baseScore.soil += 10;
  }

  if (currentData.region === "Nordeste") baseScore.climate -= 15;
  if (currentData.crop === "Hortaliças") baseScore.water -= 10;
  if (currentData.crop === "Soja") baseScore.soil -= 10;

  Object.keys(baseScore).forEach((k) => {
    if (baseScore[k] > 90) baseScore[k] = 90;
    if (baseScore[k] < 10) baseScore[k] = 10;
  });

  const total = calcTotal(baseScore);
  animateValue("total-score-display", 0, total, 1000);

  const dataArr = [
    baseScore.water,
    baseScore.soil,
    baseScore.bio,
    baseScore.climate,
  ];

  desenharRadar("scoreChart", dataArr, "#fbc02d");
}

function initSimulator() {
  document
    .querySelectorAll(".sim-checkbox")
    .forEach((cb) => (cb.checked = false));

  updateSimulator();
}

function updateSimulator() {
  projectedScore = { ...baseScore };

  document.querySelectorAll(".sim-checkbox:checked").forEach((cb) => {
    const impact = JSON.parse(cb.getAttribute("data-impact"));
    projectedScore.water += impact.water || 0;
    projectedScore.soil += impact.soil || 0;
    projectedScore.bio += impact.bio || 0;
    projectedScore.climate += impact.climate || 0;
  });

  Object.keys(projectedScore).forEach((k) => {
    if (projectedScore[k] > 100) projectedScore[k] = 100;
  });

  const currTotal = calcTotal(baseScore);
  const projTotal = calcTotal(projectedScore);

  document.getElementById("sim-current-score").innerText = currTotal;
  document.getElementById("sim-projected-score").innerHTML =
    `${projTotal} <svg class="icon trend-up ${
      projTotal > currTotal ? "" : "hidden"
    }" id="sim-trend-icon" viewBox="0 0 24 24"><polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" /></svg>`;

  const currData = [
    baseScore.water,
    baseScore.soil,
    baseScore.bio,
    baseScore.climate,
  ];
  const projData = [
    projectedScore.water,
    projectedScore.soil,
    projectedScore.bio,
    projectedScore.climate,
  ];

  desenharRadar("simChartCurrent", currData, "#9ca3af");
  desenharRadar("simChartProjected", projData, "#4caf50");
}

document.querySelectorAll(".sim-checkbox").forEach((cb) => {
  cb.addEventListener("change", updateSimulator);
});

function iconeSVG(nome) {
  const formas = {
    tractor:
      `<circle cx="7" cy="16" r="3.5" /><circle cx="18" cy="17" r="2.5" /><path d="M4 13V8h6l2 5" /><path d="M12 13h4l2-3" /><path d="M10 8V6h3" />`,
    seedling:
      `<path d="M12 20v-7" /><path d="M12 13c-1-4-4-5-7-5 0 4 3 6 7 5Z" /><path d="M12 11c1-3 4-4 6-4 0 3-3 5-6 4Z" />`,
    leaf:
      `<path d="M5 19c0-7 5-13 14-14 1 9-5 15-14 14Z" /><path d="M5 19c3-5 7-8 11-9" />`,
    wheat:
      `<line x1="12" y1="21" x2="12" y2="10" /><path d="M12 10c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 10c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5ZM12 14c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 14c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5ZM12 7c0-2 1.5-3.5 3.5-3.5 0 2-1.5 3.5-3.5 3.5ZM12 7c0-2-1.5-3.5-3.5-3.5 0 2 1.5 3.5 3.5 3.5Z" />`,
  };

  return formas[nome] || "";
}

function generateCalendar() {
  const container = document.getElementById("calendar-timeline");
  container.innerHTML = "";

  const hasPD = document.querySelector(
    '.sim-checkbox[data-impact*="soil\\": 30"]',
  ).checked;
  const hasIrrigacao = document.querySelector(
    '.sim-checkbox[data-impact*="water\\": 35"]',
  ).checked;

  const events = [
    {
      month: "Setembro - Outubro",
      title: "Preparo Sustentável do Solo",
      icon: "tractor",
      color: "icon-brown",
      dot: "dot-amber",
      desc: hasPD
        ? "Manter a palhada da cultura anterior no solo. NÃO arar. Fazer dessecação química focada apenas onde for plantar."
        : "Preparo mínimo do solo. Fazer análise de solo e correção com calcário se necessário.",
    },
    {
      month: "Novembro - Dezembro",
      title: `Plantio de ${currentData.crop}`,
      icon: "seedling",
      color: "icon-green",
      dot: "dot-green",
      desc: `Semeadura do ${currentData.crop} aproveitando o início das chuvas na região ${currentData.region}. Garantir espaçamento adequado para evitar competição por luz.`,
    },
    {
      month: "Janeiro - Fevereiro",
      title: "Manejo e Crescimento",
      icon: "leaf",
      color: "icon-green",
      dot: "dot-light",
      desc: hasIrrigacao
        ? "Ativar sistema de gotejamento apenas nos horários mais frescos (início da manhã ou fim da tarde). Monitorar pragas semanalmente."
        : "Manter controle de ervas daninhas. Monitorar pragas semanalmente. O solo coberto ajudará a reter a água das chuvas.",
    },
    {
      month: "Março - Abril",
      title: "Colheita e Pós-Colheita",
      icon: "wheat",
      color: "icon-yellow",
      dot: "dot-yellow",
      desc: `Realizar a colheita do ${currentData.crop}. Importante: Deixar os restos culturais no campo para proteger o solo para a próxima safra.`,
    },
  ];

  events.forEach((ev) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-row">
        <div class="timeline-month-desktop">${ev.month}</div>
        <div class="timeline-dot ${ev.dot}"></div>
        <div class="timeline-content">
          <div class="timeline-card">
            <span class="timeline-month-mobile">${ev.month}</span>
            <h4>
              <svg class="icon ${ev.color}" viewBox="0 0 24 24">${iconeSVG(ev.icon)}</svg>
              ${ev.title}
            </h4>
            <p>${ev.desc}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function animateValue(id, start, end, duration) {
  if (start === end) return;

  const obj = document.getElementById(id);
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;

    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function formatarDataBrasileira(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano}, ${hora}:${minuto}`;
}

function atualizarDataPDF() {
  const printDate = document.getElementById("print-date");

  if (printDate) {
    printDate.innerText = formatarDataBrasileira(new Date());
  }
}

function gerarPDF() {
  const tituloOriginal = document.title;

  atualizarDataPDF();
  document.title = " ";
  window.print();
  document.title = tituloOriginal;
}

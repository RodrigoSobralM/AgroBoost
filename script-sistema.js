// Estado da Aplicação
let currentData = {
  region: "",
  soil: "",
  crop: "",
};

// Scores base (0-100) - { água, solo, bio, clima }
let baseScore = { water: 30, soil: 40, bio: 30, climate: 35 };
let projectedScore = { ...baseScore };

// Instâncias do Chart.js
let mainChart, simCurrentChart, simProjectedChart;

// Configurações Globais do Chart.js
Chart.defaults.font.family = "'Inter', 'Segoe UI', sans-serif";
Chart.defaults.color = "#6b7280";

// --- Navegação entre Etapas ---
function goToStep(step) {
  // Validação simples da Etapa 1
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

  // UI Updates
  document.querySelectorAll(".step-container").forEach((el) => {
    el.classList.remove("active-step");
    el.classList.add("hidden-step");
  });
  document.getElementById(`step-${step}`).classList.remove("hidden-step");
  document.getElementById(`step-${step}`).classList.add("active-step");

  // Atualiza Barra de Progresso
  const progress = ((step - 1) / 3) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;

  for (let i = 1; i <= 4; i++) {
    const badge = document.getElementById(`badge-${i}`);
    if (i <= step) {
      badge.classList.remove("bg-gray-200", "text-gray-500");
      badge.classList.add("bg-agro", "text-white");
    } else {
      badge.classList.add("bg-gray-200", "text-gray-500");
      badge.classList.remove("bg-agro", "text-white");
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Cálculo e Gráficos ---

function getRadarConfig(dataArr, label, colorHex) {
  return {
    type: "radar",
    data: {
      labels: ["Água", "Solo", "Biodiversidade", "Clima"],
      datasets: [
        {
          label: label,
          data: dataArr,
          backgroundColor: `${colorHex}40`, // 40 = 25% opacity in hex
          borderColor: colorHex,
          pointBackgroundColor: colorHex,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: colorHex,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: "rgba(0, 0, 0, 0.1)" },
          grid: { color: "rgba(0, 0, 0, 0.1)" },
          pointLabels: {
            font: { size: 12, weight: "bold" },
            color: "#4b5563",
          },
          ticks: { display: false, min: 0, max: 100, stepSize: 20 },
        },
      },
      plugins: { legend: { display: false } },
    },
  };
}

function calcTotal(scoreObj) {
  return Math.round(
    (scoreObj.water + scoreObj.soil + scoreObj.bio + scoreObj.climate) / 4,
  );
}

function calculateBaseScore() {
  // Lógica fictícia baseada nas respostas
  baseScore = { water: 50, soil: 50, bio: 40, climate: 40 };

  if (currentData.soil === "Arenoso") baseScore.water -= 20; // Arenoso perde água fácil
  if (currentData.soil === "Argiloso") {
    baseScore.water += 10;
    baseScore.soil += 10;
  }

  if (currentData.region === "Nordeste") baseScore.climate -= 15; // Risco de seca maior
  if (currentData.crop === "Hortaliças") baseScore.water -= 10; // Exige mais água
  if (currentData.crop === "Soja") baseScore.soil -= 10; // Monocultura desgasta mais

  // Garante que não passa de 100 ou cai < 10
  Object.keys(baseScore).forEach((k) => {
    if (baseScore[k] > 90) baseScore[k] = 90; // Deixa margem para melhorar
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

  if (mainChart) mainChart.destroy();
  const ctx = document.getElementById("scoreChart").getContext("2d");
  mainChart = new Chart(ctx, getRadarConfig(dataArr, "Score Atual", "#fbc02d")); // Yellow base
}

function initSimulator() {
  // Reseta checkboxes
  document
    .querySelectorAll(".sim-checkbox")
    .forEach((cb) => (cb.checked = false));
  updateSimulator();
}

function updateSimulator() {
  projectedScore = { ...baseScore };

  // Soma impactos marcados
  document.querySelectorAll(".sim-checkbox:checked").forEach((cb) => {
    const impact = JSON.parse(cb.getAttribute("data-impact"));
    projectedScore.water += impact.water || 0;
    projectedScore.soil += impact.soil || 0;
    projectedScore.bio += impact.bio || 0;
    projectedScore.climate += impact.climate || 0;
  });

  // Limita a 100
  Object.keys(projectedScore).forEach((k) => {
    if (projectedScore[k] > 100) projectedScore[k] = 100;
  });

  const currTotal = calcTotal(baseScore);
  const projTotal = calcTotal(projectedScore);

  document.getElementById("sim-current-score").innerText = currTotal;
  document.getElementById("sim-projected-score").innerHTML =
    `${projTotal} <i class="fa-solid fa-arrow-trend-up text-sm text-green-500 ${projTotal > currTotal ? "" : "hidden"}" id="sim-trend-icon"></i>`;

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

  if (simCurrentChart) simCurrentChart.destroy();
  if (simProjectedChart) simProjectedChart.destroy();

  simCurrentChart = new Chart(
    document.getElementById("simChartCurrent").getContext("2d"),
    getRadarConfig(currData, "Atual", "#9ca3af"),
  ); // Gray
  simProjectedChart = new Chart(
    document.getElementById("simChartProjected").getContext("2d"),
    getRadarConfig(projData, "Projetado", "#4caf50"),
  ); // Green
}

// Listener para as checkboxes do simulador
document.querySelectorAll(".sim-checkbox").forEach((cb) => {
  cb.addEventListener("change", updateSimulator);
});

// --- Geração do Calendário ---
function generateCalendar() {
  const container = document.getElementById("calendar-timeline");
  container.innerHTML = ""; // Clear

  // Práticas selecionadas para incluir no calendário
  const hasPD = document.querySelector(
    '.sim-checkbox[data-impact*="soil\\": 30"]',
  ).checked; // Plantio direto
  const hasIrrigacao = document.querySelector(
    '.sim-checkbox[data-impact*="water\\": 35"]',
  ).checked;

  const events = [
    {
      month: "Setembro - Outubro",
      title: "Preparo Sustentável do Solo",
      icon: "fa-tractor",
      color: "text-amber-700",
      bg: "bg-amber-100",
      desc: hasPD
        ? "Manter a palhada da cultura anterior no solo. NÃO arar. Fazer dessecação química focada apenas onde for plantar."
        : "Preparo mínimo do solo. Fazer análise de solo e correção com calcário se necessário.",
    },
    {
      month: "Novembro - Dezembro",
      title: `Plantio de ${currentData.crop}`,
      icon: "fa-seedling",
      color: "text-green-600",
      bg: "bg-green-100",
      desc: `Semeadura do ${currentData.crop} aproveitando o início das chuvas na região ${currentData.region}. Garantir espaçamento adequado para evitar competição por luz.`,
    },
    {
      month: "Janeiro - Fevereiro",
      title: "Manejo e Crescimento",
      icon: "fa-leaf",
      color: "text-agro",
      bg: "bg-agro-light",
      desc: hasIrrigacao
        ? "Ativar sistema de gotejamento apenas nos horários mais frescos (início da manhã ou fim da tarde). Monitorar pragas semanalmente."
        : "Manter controle de ervas daninhas. Monitorar pragas semanalmente. O solo coberto ajudará a reter a água das chuvas.",
    },
    {
      month: "Março - Abril",
      title: "Colheita e Pós-Colheita",
      icon: "fa-wheat-awn",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      desc: `Realizar a colheita do ${currentData.crop}. Importante: Deixar os restos culturais no campo para proteger o solo para a próxima safra.`,
    },
  ];

  events.forEach((ev) => {
    const item = document.createElement("div");
    item.className = "relative pl-8 md:pl-0";
    item.innerHTML = `
                    <div class="md:flex items-center justify-between md:w-full">
                        <div class="hidden md:block w-1/3 text-right pr-8">
                            <span class="text-gray-500 font-bold text-sm uppercase">${ev.month}</span>
                        </div>
                        
                        <div class="absolute left-[-9px] md:left-1/3 md:-translate-x-1/2 w-6 h-6 rounded-full ${ev.bg} border-4 border-white shadow flex items-center justify-center"></div>
                        
                        <div class="md:w-2/3 md:pl-8 mt-2 md:mt-0">
                            <div class="bg-gray-50 border border-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <span class="md:hidden text-gray-500 font-bold text-xs uppercase block mb-1">${ev.month}</span>
                                <h4 class="font-bold text-lg text-gray-800 flex items-center gap-2">
                                    <i class="fa-solid ${ev.icon} ${ev.color}"></i> ${ev.title}
                                </h4>
                                <p class="text-sm text-gray-600 mt-2">${ev.desc}</p>
                            </div>
                        </div>
                    </div>
                `;
    container.appendChild(item);
  });
}

// --- Utilitários ---
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

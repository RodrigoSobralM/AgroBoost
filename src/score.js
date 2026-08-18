export function calcularBaseScore(dados) {
  const score = { water: 50, soil: 50, bio: 40, climate: 40 };

  if (dados.soil === "Arenoso") score.water -= 20;

  if (dados.soil === "Argiloso") {
    score.water += 10;
    score.soil += 10;
  }

  if (dados.region === "Nordeste") score.climate -= 15;
  if (dados.crop === "Hortaliças") score.water -= 10;
  if (dados.crop === "Soja") score.soil -= 10;

  Object.keys(score).forEach((k) => {
    if (score[k] > 90) score[k] = 90;
    if (score[k] < 10) score[k] = 10;
  });

  return score;
}

export function calcTotal(score) {
  return Math.round((score.water + score.soil + score.bio + score.climate) / 4);
}

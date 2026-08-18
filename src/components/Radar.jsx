const centro = 130;
const raio = 85;
const eixos = ["Água", "Solo", "Biodiversidade", "Clima"];

function coordenadaRadar(raioEixo, indice, valor) {
  const angulo = (-90 + indice * 90) * (Math.PI / 180);
  const distancia = (valor / 100) * raioEixo;

  return {
    x: Math.round((centro + distancia * Math.cos(angulo)) * 10) / 10,
    y: Math.round((centro + distancia * Math.sin(angulo)) * 10) / 10,
  };
}

function pontosDoPoligono(valores) {
  return valores
    .map((valor, i) => {
      const p = coordenadaRadar(raio, i, valor);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

export default function Radar({ valores, cor }) {
  return (
    <div className="radar">
      <svg viewBox="0 0 260 260" className="radar-svg">
        {[25, 50, 75, 100].map((nivel) => (
          <polygon
            key={nivel}
            points={pontosDoPoligono(eixos.map(() => nivel))}
            fill="none"
            stroke="rgba(0, 0, 0, 0.1)"
          />
        ))}

        {eixos.map((nome, i) => {
          const ponta = coordenadaRadar(raio, i, 100);

          return (
            <line
              key={nome}
              x1={centro}
              y1={centro}
              x2={ponta.x}
              y2={ponta.y}
              stroke="rgba(0, 0, 0, 0.1)"
            />
          );
        })}

        <polygon
          points={pontosDoPoligono(valores)}
          fill={cor}
          fillOpacity="0.25"
          stroke={cor}
          strokeWidth="2"
        />

        {valores.map((valor, i) => {
          const p = coordenadaRadar(raio, i, valor);

          return <circle key={eixos[i]} cx={p.x} cy={p.y} r="3" fill={cor} />;
        })}

        {eixos.map((nome, i) => {
          const rotulo = coordenadaRadar(raio + 18, i, 100);

          return (
            <text
              key={nome}
              x={rotulo.x}
              y={rotulo.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#4b5563"
            >
              {nome}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

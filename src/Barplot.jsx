import * as d3 from "d3";

// The chart dimensions
const width = 500;
const height = 400;
const margin = { top: 10, right: 30, bottom: 10, left: 100 };

// Initialize React Component
export const Barplot = ({ data }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // 1️⃣ Do some math with D3
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, innerWidth]);

  // 2️⃣ Render with React (JSX!) using the D3 maths
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d) => {
          const y = yScale(d.country);
          const barWidth = xScale(d.students);
          const midY = y + yScale.bandwidth() / 2;

          return (
            <g key={d.country}>
              <text x={-6} y={midY} dy="0.35em" textAnchor="end" fontSize={11}>
                {d.country}
              </text>
              <rect
                x={0}
                y={y}
                width={barWidth}
                height={yScale.bandwidth()}
                fill="steelblue"
              />
              <text x={barWidth + 4} y={midY} dy="0.35em" fontSize={11}>
                {d.students}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

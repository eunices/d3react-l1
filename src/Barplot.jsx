import * as d3 from "d3";

// The chart dimensions (often passed as prop too)
const width = 600;
const height = 500;
const labelWidth = 110;

// Initialize React Component
export const Barplot = ({ data }) => {
  // 1️⃣ Do some math with D3
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, width - labelWidth - 40]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, height])
    .padding(0.2);

  const barHeight = yScale.bandwidth();

  const colorScale = d3
    .scaleSequential(d3.interpolateBlues)
    .domain([0, d3.max(data, (d) => d.students)]);

  // 2️⃣ Render with React (JSX!) using the D3 maths
  return (
    <div style={{ position: "relative", width, height, fontSize: 12 }}>
      {data.map((d) => (
        <div key={d.country}>
          <div
            style={{
              position: "absolute",
              top: yScale(d.country),
              left: 0,
              width: labelWidth - 8,
              height: barHeight,
              lineHeight: `${barHeight}px`,
              textAlign: "right",
            }}
          >
            {d.country}
          </div>
          <div
            style={{
              position: "absolute",
              top: yScale(d.country),
              left: labelWidth,
              width: xScale(d.students),
              height: barHeight,
              background: colorScale(d.students * 0.7 + 10),
            }}
          />
          <div
            style={{
              position: "absolute",
              top: yScale(d.country),
              left: labelWidth + xScale(d.students) + 4,
              height: barHeight,
              lineHeight: `${barHeight}px`,
            }}
          >
            {d.students}
          </div>
        </div>
      ))}
    </div>
  );
};

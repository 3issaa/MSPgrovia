export default function LineChart({ points, color = "#1ec6d8" }) {
  const width = 260;
  const height = 62;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = width / (points.length - 1);
  const path = points
    .map((point, index) => {
      const x = index * stepX;
      const y = height - ((point - min) / (max - min || 1)) * (height - 10) - 8;
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-14 w-full"
      aria-label="Trend chart"
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

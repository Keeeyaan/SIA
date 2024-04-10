import { Cell, Pie, PieChart } from "recharts";

const needle = ({
  value,
  data,
  cx,
  cy,
  iR,
  oR,
  color,
}: {
  value: number;
  data: {
    name: string;
    value: number;
  }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
}) => {
  const RADIAN = Math.PI / 180;

  let total = 0;

  data.forEach((v) => {
    total += v.value;
  });

  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

function calculateNeedlePosition(
  negativeCount: number,
  neutralCount: number,
  positiveCount: number
): number {
  const totalCount = positiveCount + negativeCount + neutralCount;
  const division = totalCount / 3;

  // Calculate the ranges for each sentiment category
  const negativeRange = division * 1;
  const neutralRange = division * 2;
  const positiveRange = division * 3;

  if (positiveCount > negativeCount && positiveCount > neutralCount) {
    return positiveRange / 1.2;
  } else if (negativeCount > positiveCount && negativeCount > neutralCount) {
    return negativeRange / 2;
  } else {
    return neutralRange / 1.3;
  }
}

const PieChartWithNeedle = ({
  data,
}: {
  data: {
    neutral: number;
    positive: number;
    negative: number;
  };
}) => {
  const cx = 134;
  const cy = 140;
  const iR = 50;
  const oR = 100;

  const totalCount = data?.negative + data?.neutral + data?.positive || 1;

  const numericValue = [
    {
      name: "Negative",
      value: totalCount / 3,
    },
    {
      name: "Neutral",
      value: totalCount / 3,
    },
    {
      name: "Positive",
      value: totalCount / 3,
    },
  ];

  const value = calculateNeedlePosition(
    data?.negative,
    data?.neutral,
    data?.positive
  );

  const colors = ["#f87171", "#facc15", "#4ade80"];

  return (
    <PieChart width={250} height={200}>
      <Pie
        data={numericValue}
        dataKey="value"
        nameKey="name"
        cx={cx}
        cy={cy}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        startAngle={180}
        endAngle={0}
      >
        {numericValue.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      {needle({
        value,
        data: numericValue,
        cx,
        cy,
        iR,
        oR,
        color: "#d0d000",
      })}
    </PieChart>
  );
};

export default PieChartWithNeedle;

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const CustomLineChart = ({ data = [] }) => {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.25} />
              <stop offset="70%" stopColor="#7c3aed" stopOpacity={0.06} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.25}
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            dy={8}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={40}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#7c3aed", strokeWidth: 1, opacity: 0.25 }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#7c3aed"
            strokeWidth={3}
            fill="url(#incomeFill)"
            dot={{ r: 4, stroke: "#7c3aed", strokeWidth: 2, fill: "#fff" }}
            activeDot={{
              r: 6,
              stroke: "#7c3aed",
              strokeWidth: 2,
              fill: "#fff",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;

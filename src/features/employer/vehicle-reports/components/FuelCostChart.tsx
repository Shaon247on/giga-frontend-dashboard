"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface FuelCostChartProps {
  data: {
    vehicle: string;
    liters: number;
    cost: number;
  }[];
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-4">
        <p className="text-[13px] font-semibold text-primary-txt">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-[12px] text-secondary-txt">
            {item.name}:{" "}
            <span className="font-medium text-primary-txt">
              {item.dataKey === "liters" 
                ? `${item.value.toFixed(1)} L` 
                : `$${item.value.toFixed(2)}`}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function FuelCostChart({ data }: FuelCostChartProps) {
  const totalLiters = data.reduce((sum, item) => sum + item.liters, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-primary-txt">Fuel Cost by Vehicle</h3>
          <p className="text-[12px] text-secondary-txt mt-0.5">{totalLiters.toFixed(1)} L total</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="vehicle"
              tick={{ fontSize: 11, fill: "#667085" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: "#667085" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}L`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: "#667085" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 12, color: "#667085", paddingTop: 10 }}
              iconType="circle"
              iconSize={8}
            />
            <Bar
              yAxisId="left"
              dataKey="liters"
              name="Liters"
              fill="#135CC8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="cost"
              name="Cost"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
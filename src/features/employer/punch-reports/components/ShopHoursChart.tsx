"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

interface ShopHoursChartProps {
  data: {
    shop: string;
    hours: number;
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
        <p className="text-[12px] text-secondary-txt">
          Hours:{" "}
          <span className="font-medium text-primary-txt">
            {payload[0].value.toFixed(1)} hrs
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function ShopHoursChart({ data }: ShopHoursChartProps) {
  const totalHours = data.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-primary-txt">
            Hours by Shop — Week of Jun 2–8
          </h3>
          <p className="text-[12px] text-secondary-txt mt-0.5">
            {totalHours.toFixed(1)} total hours
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            barSize={50}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="shop"
              tick={{ fontSize: 12, fill: "#667085" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#667085" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="hours"
              name="Hours"
              fill="#135CC8"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
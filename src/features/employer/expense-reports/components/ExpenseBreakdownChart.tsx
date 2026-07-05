"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";

interface ExpenseBreakdownChartProps {
  personalPercentage: number;
  visaPercentage: number;
  personalPaid: number;
  visaPaid: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    percent?: number;
    payload?: {
      name: string;
      value: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const name = data.name || data.payload?.name || "";
    const value = data.value || data.payload?.value || 0;
    // Recharts provides percent as a decimal (e.g., 0.32 for 32%)
    const percent = data.percent !== undefined ? data.percent * 100 : 0;

    return (
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-4">
        <p className="text-[13px] font-semibold text-primary-txt">{name}</p>
        <p className="text-[12px] text-secondary-txt">
          {percent.toFixed(0)}% of total
        </p>
        <p className="text-[12px] text-secondary-txt mt-1">
          Value: {value}%
        </p>
      </div>
    );
  }
  return null;
};

export function ExpenseBreakdownChart({
  personalPercentage,
  visaPercentage,
  personalPaid,
  visaPaid,
}: ExpenseBreakdownChartProps) {
  const data = [
    { name: "Personal", value: personalPercentage },
    { name: "Visa / Card", value: visaPercentage },
  ];

  const COLORS = ["#135CC8", "#8B5CF6"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
      <h3 className="text-[15px] font-bold text-primary-txt mb-4">Expense Breakdown</h3>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => {
                  const percentage = percent !== undefined ? percent * 100 : 0;
                  return `${name}: ${percentage.toFixed(0)}%`;
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Bars */}
        <div className="w-full md:w-1/2 space-y-4">
          {/* Personal */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-primary-txt">Personal</span>
              <span className="text-secondary-txt">{personalPercentage}% of total</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#135CC8] rounded-full transition-all duration-500"
                style={{ width: `${personalPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-secondary-txt mt-1">
              <span>Paid out: ${personalPaid.toFixed(2)}</span>
              <span>Ending</span>
            </div>
          </div>

          {/* Visa */}
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="font-medium text-primary-txt">Visa / Card</span>
              <span className="text-secondary-txt">{visaPercentage}% of total</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] rounded-full transition-all duration-500"
                style={{ width: `${visaPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-secondary-txt mt-1">
              <span>Paid out: ${visaPaid.toFixed(2)}</span>
              <span>Ending</span>
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-primary-txt">Total</span>
              <span className="font-semibold text-primary-txt">
                ${(personalPaid + visaPaid).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
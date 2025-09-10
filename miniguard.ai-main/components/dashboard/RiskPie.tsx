"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardCard } from "./DashboardCard";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // Low, Medium, High

export default function RiskPie({ data }: { data: any[] }) {
  const counts = { Low: 0, Medium: 0, High: 0 };
  data.forEach((d) => {
    if (d.riskClass in counts) counts[d.riskClass as keyof typeof counts]++;
  });

  const chartData = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <DashboardCard title="Risk Distribution">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
}

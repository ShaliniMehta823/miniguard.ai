"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RiskCharts({ data }: { data: any[] }) {
  const chartData = (data || []).map((d) => ({
    x: new Date(d.createdAt).toLocaleString(),
    y: Math.round(d.riskScore * 100),
  }));

  return (
    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)]">
      <h3 className="text-lg font-semibold mb-2">Risk History</h3>
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <XAxis dataKey="x" hide />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

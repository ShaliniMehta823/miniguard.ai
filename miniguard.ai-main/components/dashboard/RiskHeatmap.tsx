"use client";

import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { DashboardCard } from "./DashboardCard";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function RiskHeatmap({ data }: { data: any[] }) {
  const values = data.map((d) => ({
    date: new Date(d.createdAt).toISOString().split("T")[0],
    count: Math.round(d.riskScore * 100),
  }));

  return (
    <DashboardCard title="Risk Intensity (90 Days)">
      <CalendarHeatmap
        startDate={new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)}
        endDate={new Date()}
        values={values}
        classForValue={(value) => {
          if (!value) return "color-empty";
          if (value.count < 33) return "color-low";
          if (value.count < 66) return "color-medium";
          return "color-high";
        }}
        tooltipDataAttrs={(value: any) => {
          if (!value?.date) return {};
          return {
            "data-tooltip-id": "risk-tooltip",
            "data-tooltip-content": `📅 ${value.date} — Risk: ${value.count}%`,
          };
        }}
        showWeekdayLabels={true}
      />
      <ReactTooltip id="risk-tooltip" className="!bg-neutral-900 !text-white !px-3 !py-1 !rounded-md !text-sm" />
    </DashboardCard>
  );
}

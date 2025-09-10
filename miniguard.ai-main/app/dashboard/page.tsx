"use client";

import React, { useEffect, useState } from "react";
import BackgroundFX from "@/components/background-fx";
import FactorsForm from "@/components/dashboard/FactorsForm";
import RiskSummary from "@/components/dashboard/RiskSummary";
import RiskCharts from "@/components/dashboard/RiskCharts";
import RiskPie from "@/components/dashboard/RiskPie";
import RiskHeatmap from "@/components/dashboard/RiskHeatmap";

export default function DashboardPage() {
  const [latestPredictions, setLatestPredictions] = useState<any[]>([]);
  const [lastResult, setLastResult] = useState<any | null>(null);

  async function fetchHistory() {
    const res = await fetch(`/api/predictions?limit=120`);
    if (res.ok) setLatestPredictions(await res.json());
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <BackgroundFX />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Mineguard Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: input form */}
          <div className="lg:col-span-1">
            <FactorsForm
              onResult={(res) => {
                setLastResult(res);
                fetchHistory();
              }}
            />
          </div>

          {/* Right column: summary + charts */}
          <div className="lg:col-span-2 space-y-6">
            <RiskSummary result={lastResult} />
            <RiskCharts data={latestPredictions} />
            <RiskPie data={latestPredictions} />
            <RiskHeatmap data={latestPredictions} />
          </div>
        </div>
      </div>
    </main>
  );
}

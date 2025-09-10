"use client";

import React from "react";

export default function RiskSummary({ result }: { result: any | null }) {
  if (!result)
    return (
      <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)]">
        No prediction yet. Submit factors to run a prediction.
      </div>
    );

  const { riskScore, riskClass } = result;
  const color =
    riskClass === "High"
      ? "bg-red-600"
      : riskClass === "Medium"
      ? "bg-yellow-500"
      : "bg-emerald-500";

  return (
    <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-neutral-300">Latest Prediction</div>
          <div className="text-2xl font-semibold">
            {(riskScore * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-neutral-400">Risk Score</div>
        </div>
        <div
          className={`px-4 py-2 rounded-full text-black font-semibold ${color}`}
        >
          {riskClass}
        </div>
      </div>
      <div className="mt-3 text-sm text-neutral-400">
        Result ID: {result.predictionId}
      </div>
    </div>
  );
}

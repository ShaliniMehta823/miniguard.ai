"use client";

import React, { useState } from "react";

export default function FactorsForm({
  onResult,
}: {
  onResult?: (res: any) => void;
}) {
  const [locationName, setLocationName] = useState("Demo Site A");
  const [rainfall_mm, setRainfall] = useState(20);
  const [wind_mps, setWind] = useState(2);
  const [temperature_c, setTemperature] = useState(22);
  const [humidity, setHumidity] = useState(45);
  const [slope, setSlope] = useState(8);
  const [priorIncidents, setPriorIncidents] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        locationName,
        weather: {
          rainfall_mm: Number(rainfall_mm),
          wind_mps: Number(wind_mps),
          temperature_c: Number(temperature_c),
        },
        climate: { season: "monsoon", humidity: Number(humidity) },
        geology: { slope_deg: Number(slope) },
        history: { priorIncidents: Number(priorIncidents) },
        meta: { source: "manual" },
      };

      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok) {
        onResult?.(json);
      } else {
        alert(json.error || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[rgba(255,255,255,0.03)] p-4 rounded-2xl space-y-3"
    >
      <label className="block text-sm">Location</label>
      <input
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />

      <label className="block text-sm">Rainfall (mm)</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={rainfall_mm}
        onChange={(e) => setRainfall(Number(e.target.value))}
      />

      <label className="block text-sm">Wind (m/s)</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={wind_mps}
        onChange={(e) => setWind(Number(e.target.value))}
      />

      <label className="block text-sm">Temperature (°C)</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={temperature_c}
        onChange={(e) => setTemperature(Number(e.target.value))}
      />

      <label className="block text-sm">Humidity (%)</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={humidity}
        onChange={(e) => setHumidity(Number(e.target.value))}
      />

      <label className="block text-sm">Slope (°)</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={slope}
        onChange={(e) => setSlope(Number(e.target.value))}
      />

      <label className="block text-sm">Prior Incidents</label>
      <input
        type="number"
        className="w-full p-2 bg-transparent border border-neutral-800 rounded"
        value={priorIncidents}
        onChange={(e) => setPriorIncidents(Number(e.target.value))}
      />

      <button
        type="submit"
        className="w-full bg-emerald-500 text-black py-2 rounded-lg font-semibold"
      >
        {loading ? "Predicting..." : "Predict Risk"}
      </button>
    </form>
  );
}

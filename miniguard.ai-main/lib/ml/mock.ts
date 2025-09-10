// A simple heuristic-based risk calculator for demo purposes

export function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

export function computeRisk(factors: {
  weather: { rainfall_mm: number; wind_mps: number; temperature_c: number };
  climate: { season: string; humidity: number };
  geology?: { slope_deg?: number };
  history?: { priorIncidents?: number };
}) {
  // Arbitrary weights for each factor (tuned just for demo realism)
  const w = {
    rainfall: 0.4,
    wind: 0.05,
    slope: 0.25,
    humidity: 0.15,
    incidents: 0.3,
    temp: 0.02,
  };

  const { weather, climate, geology, history } = factors;

  const slope = geology?.slope_deg ?? 5;
  const incidents = history?.priorIncidents ?? 0;
  const tempDelta = Math.abs(weather.temperature_c - 20) / 20; // deviation from mild weather

  // Linear combination of factors
  const linear =
    w.rainfall * (weather.rainfall_mm / 100) +
    w.wind * (weather.wind_mps / 20) +
    w.slope * (slope / 45) +
    w.humidity * (climate.humidity / 100) +
    w.incidents * Math.min(incidents, 10) / 10 +
    w.temp * tempDelta;

  // Apply sigmoid to normalize between 0 and 1
  const score = Math.min(1, Math.max(0, sigmoid((linear - 0.5) * 5)));

  // Categorize into classes
  const riskClass = score < 0.33 ? "Low" : score < 0.66 ? "Medium" : "High";

  return {
    score: Math.round(score * 1000) / 1000, // rounded to 3 decimals
    riskClass,
  };
}

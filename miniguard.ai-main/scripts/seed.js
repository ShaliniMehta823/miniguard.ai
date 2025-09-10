// Run with: node scripts/seed.js
import mongoose from "mongoose";
import "dotenv/config";

// ✅ DB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mineguard";

async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");
}

// ✅ Schema
const PredictionSchema = new mongoose.Schema({
  locationName: String,
  weather: {
    rainfall_mm: Number,
    wind_mps: Number,
    temperature_c: Number,
  },
  climate: {
    season: String,
    humidity: Number,
  },
  geology: {
    soilComposition: String,
    rockComposition: String,
    slope_deg: Number,
  },
  history: {
    priorIncidents: Number,
    lastIncidentAt: Date,
  },
  riskScore: Number,
  riskClass: String,
  createdAt: Date,
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

// ✅ Mock Risk Calculator
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function computeRisk({ weather, climate, geology, history }) {
  const w = { rainfall: 0.4, wind: 0.05, slope: 0.25, humidity: 0.15, incidents: 0.3, temp: 0.02 };

  const slope = geology?.slope_deg ?? 5;
  const incidents = history?.priorIncidents ?? 0;
  const tempDelta = Math.abs(weather.temperature_c - 20) / 20;

  const linear =
    w.rainfall * (weather.rainfall_mm / 100) +
    w.wind * (weather.wind_mps / 20) +
    w.slope * (slope / 45) +
    w.humidity * (climate.humidity / 100) +
    w.incidents * Math.min(incidents, 10) / 10 +
    w.temp * tempDelta;

  const score = Math.min(1, Math.max(0, sigmoid((linear - 0.5) * 5)));
  const riskClass = score < 0.33 ? "Low" : score < 0.66 ? "Medium" : "High";

  return { score: Math.round(score * 1000) / 1000, riskClass };
}

// ✅ Seeder
async function seed() {
  await connectDB();

  const sites = ["Demo Site A", "Demo Site B", "Demo Site C"];
  const items = [];

  for (let i = 0; i < 120; i++) {
    const site = sites[i % sites.length];

    const weather = {
      rainfall_mm: Math.round(Math.random() * 200),
      wind_mps: Math.round(Math.random() * 15),
      temperature_c: Math.round(10 + Math.random() * 25),
    };

    const climate = {
      season: ["summer", "monsoon", "winter"][i % 3],
      humidity: Math.round(30 + Math.random() * 70),
    };

    const geology = {
      soilComposition: "clay",
      rockComposition: "sandstone",
      slope_deg: Math.round(Math.random() * 40),
    };

    const history = { priorIncidents: Math.round(Math.random() * 5) };

    const { score, riskClass } = computeRisk({ weather, climate, geology, history });

    items.push({
      locationName: site,
      weather,
      climate,
      geology,
      history,
      riskScore: score,
      riskClass,
      createdAt: new Date(Date.now() - Math.round(Math.random() * 1000 * 60 * 60 * 24 * 90)),
    });
  }

  await Prediction.insertMany(items);
  console.log(`✅ Seeded ${items.length} predictions into MongoDB`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});

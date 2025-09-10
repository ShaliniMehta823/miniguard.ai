import mongoose, { Schema, Document } from "mongoose";

export interface IPrediction extends Document {
  locationName: string;
  weather: { rainfall_mm: number; wind_mps: number; temperature_c: number };
  climate: { season: string; humidity: number };
  geology?: { soilComposition?: string; rockComposition?: string; slope_deg?: number };
  history?: { priorIncidents?: number; lastIncidentAt?: Date };
  riskScore: number;
  riskClass: "Low" | "Medium" | "High";
  createdAt: Date;
}

const PredictionSchema = new Schema<IPrediction>(
  {
    locationName: { type: String, required: true, index: true },
    weather: {
      rainfall_mm: { type: Number, required: true },
      wind_mps: { type: Number, required: true },
      temperature_c: { type: Number, required: true },
    },
    climate: {
      season: { type: String, required: true },
      humidity: { type: Number, required: true },
    },
    geology: {
      soilComposition: { type: String },
      rockComposition: { type: String },
      slope_deg: { type: Number },
    },
    history: {
      priorIncidents: { type: Number, default: 0 },
      lastIncidentAt: { type: Date },
    },
    riskScore: { type: Number, required: true },
    riskClass: { type: String, enum: ["Low", "Medium", "High"], required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { timestamps: false }
);

// Prevents model overwrite errors in dev (HMR)
export default (mongoose.models.Prediction as mongoose.Model<IPrediction>) ||
  mongoose.model<IPrediction>("Prediction", PredictionSchema);

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PredictionModel from "@/models/Prediction";
import { z } from "zod";
import { computeRisk } from "@/lib/ml/mock";

// Validation schema with Zod
const PredictSchema = z.object({
  locationName: z.string(),
  weather: z.object({
    rainfall_mm: z.number(),
    wind_mps: z.number(),
    temperature_c: z.number(),
  }),
  climate: z.object({
    season: z.string(),
    humidity: z.number(),
  }),
  geology: z
    .object({
      soilComposition: z.string().optional(),
      rockComposition: z.string().optional(),
      slope_deg: z.number().optional(),
    })
    .optional(),
  history: z
    .object({
      priorIncidents: z.number().optional(),
      lastIncidentAt: z.string().optional(),
    })
    .optional(),
  meta: z
    .object({
      source: z.enum(["dummy", "manual", "sensor"]),
    })
    .optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = PredictSchema.parse(body);

    await connectDB();

    // Use mock ML model
    const { score, riskClass } = computeRisk({
      weather: parsed.weather,
      climate: parsed.climate,
      geology: parsed.geology ?? {},
      history: parsed.history ?? { priorIncidents: 0 },
    });

    // Save to DB
    const doc = await PredictionModel.create({
      locationName: parsed.locationName,
      weather: parsed.weather,
      climate: parsed.climate,
      geology: parsed.geology ?? {},
      history: parsed.history ?? { priorIncidents: 0 },
      riskScore: score,
      riskClass,
      createdAt: new Date(),
    });

    return NextResponse.json({
      predictionId: doc._id,
      riskScore: score,
      riskClass,
      createdAt: doc.createdAt,
    });
  } catch (err: any) {
    console.error("/api/predict error", err);
    return NextResponse.json(
      { error: err?.message || "Prediction failed" },
      { status: 400 }
    );
  }
}

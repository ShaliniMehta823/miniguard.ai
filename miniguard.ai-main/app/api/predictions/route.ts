import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PredictionModel from "@/models/Prediction";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const location = url.searchParams.get("location");
    const limit = Math.min(200, Number(url.searchParams.get("limit") || "50"));

    const q: any = {};
    if (location) q.locationName = location;

    const data = await PredictionModel.find(q)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("/api/predictions error", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch predictions" },
      { status: 500 }
    );
  }
}

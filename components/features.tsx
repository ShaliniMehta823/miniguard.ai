import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe2, LineChart, Radio, Bell } from "lucide-react"

const features = [
  {
    title: "Real-Time Risk Maps",
    Icon: Globe2,
    desc: "Continuously updated risk overlays for operational zones with clear hazard grading.",
  },
  {
    title: "AI-Powered Predictions",
    Icon: LineChart,
    desc: "Models analyze geology, DEM, and history to forecast rockfall probability.",
  },
  {
    title: "Sensor & Drone Integration",
    Icon: Radio,
    desc: "Fuse data from drones, LiDAR, seismic sensors, and weather feeds.",
  },
  {
    title: "Instant Alerts (SMS & Email)",
    Icon: Bell,
    desc: "Proactive notifications when thresholds are exceeded.",
  },
] as const

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <header className="mb-8">
        <h2 className="text-center text-pretty text-2xl font-semibold md:text-4xl">
          Why <span className="text-emerald-400">MineGuard AI?</span>
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map(({ title, Icon, desc }) => (
          <GlassCard key={title}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-md border border-emerald-400/20 bg-emerald-500/10 p-2 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)]">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-gray-300">{desc}</p>
            </CardContent>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(16,185,129,0.18)]">
      {children}
    </Card>
  )
}

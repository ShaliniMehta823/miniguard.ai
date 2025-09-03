import { Layers, BrainCircuit, LayoutDashboard, Siren } from "lucide-react"

const steps = [
  { title: "Collect Data", desc: "DEM, Drone, Sensors, Weather", Icon: Layers },
  { title: "AI Processing", desc: "Predict Risk", Icon: BrainCircuit },
  { title: "Dashboard", desc: "Visualize", Icon: LayoutDashboard },
  { title: "Alerts", desc: "Take Action", Icon: Siren },
] as const

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <header className="mb-10">
        <h2 className="text-center text-pretty text-2xl font-semibold md:text-4xl">How It Works</h2>
      </header>

      <ol className="relative grid gap-8 md:grid-cols-4">
        {steps.map((s, idx) => (
          <li key={s.title} className="relative">
            {idx < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute left-[55%] right-[-10%] top-10 hidden h-0.5 bg-gradient-to-r from-emerald-600/30 via-emerald-400/40 to-emerald-600/30 shadow-[0_0_16px_rgba(16,185,129,0.35)] md:block"
              />
            )}

            <div className="h-full rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-shadow hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]">
              <div className="mb-3 inline-flex items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.25)]">
                  <s.Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm text-gray-400">Step {idx + 1}</span>
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="leading-relaxed text-gray-300">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

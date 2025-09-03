import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-5xl">
            <span className="text-white">AI-Powered Rockfall Prediction</span>{" "}
            <span className="text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.35)]">for Safer Mines</span>
          </h1>
          <p className="leading-relaxed text-gray-300">
            Real-time monitoring, predictive analytics, and proactive alerts — all in one platform.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:bg-emerald-400">
              Try Demo
            </Button>
            <Button
              variant="outline"
              className="border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-[0_0_50px_rgba(16,185,129,0.08)] backdrop-blur-md md:p-4">
            <Image
              src="/images/minesite-hero.png"
              alt="Futuristic mining site with AI visualization overlay"
              width={820}
              height={520}
              className="h-auto w-full rounded-lg object-cover"
              priority
            />
          </div>
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.18)]" />
        </div>
      </div>
    </section>
  )
}

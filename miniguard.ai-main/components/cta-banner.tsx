import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTABanner() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-8 backdrop-blur-md md:p-12">
        <div className="pointer-events-none absolute -inset-1 rounded-2xl opacity-30 blur-2xl bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.35),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.25),transparent_40%)]" />
        <div className="relative">
          <h3 className="text-center text-pretty text-2xl font-semibold md:text-3xl">
            Protect lives. Prevent disasters. Power your mine with <span className="text-emerald-400">AI</span>.
          </h3>
          <div className="mt-6 flex justify-center">
            <Button
              asChild
              className="bg-emerald-500 text-black shadow-[0_0_28px_rgba(16,185,129,0.45)] hover:bg-emerald-400"
            >
              <Link href="#contact">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { CTABanner } from "@/components/cta-banner"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <BackgroundFX />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </main>
  )
}

function BackgroundFX() {
  // Decorative background: dark gradient + subtle green particle/dots
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.12)_0%,rgba(0,0,0,0)_60%),linear-gradient(to_bottom,#000,#020202_30%,#000)]" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(16,185,129,0.25)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full blur-3xl bg-emerald-500/10" />
      <div className="absolute top-1/3 -right-10 h-72 w-72 rounded-full blur-3xl bg-emerald-400/10" />
    </div>
  )
}

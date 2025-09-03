"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function Navbar() {
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 transition-colors ${
        atTop ? "bg-transparent" : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="#home" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]">
            MineGuard AI
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
          <Anchor href="#home">Home</Anchor>
          <Anchor href="#features">Features</Anchor>
          <Anchor href="#how">How It Works</Anchor>
          <Anchor href="/dashboard">Dashboard</Anchor>
          <Anchor href="#contact">Contact</Anchor>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:bg-emerald-400"
          >
            <Link href="#cta">Get Started</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

function Anchor(props: React.ComponentProps<"a">) {
  return (
    <a {...props} className="hover:text-white transition-colors">
      {props.children}
    </a>
  )
}

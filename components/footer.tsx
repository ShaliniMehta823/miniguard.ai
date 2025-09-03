import type React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-emerald-400/20 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]">
              MineGuard AI
            </p>
            <p className="text-gray-400">Safer mines through intelligent prediction.</p>
          </div>

          <nav className="flex gap-6 text-gray-300">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="https://github.com" target="_blank" rel="noreferrer">
              GitHub
            </FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </nav>

          <div className="flex items-center gap-4">
            <Social href="https://linkedin.com" label="LinkedIn">
              <Linkedin className="size-5" aria-hidden="true" />
            </Social>
            <Social href="https://twitter.com" label="Twitter">
              <Twitter className="size-5" aria-hidden="true" />
            </Social>
            <Social href="https://github.com" label="GitHub">
              <Github className="size-5" aria-hidden="true" />
            </Social>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MineGuard AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterLink({
  href,
  children,
  target,
  rel,
}: {
  href: string
  children: React.ReactNode
  target?: string
  rel?: string
}) {
  return (
    <Link href={href} target={target} rel={rel} className="transition-colors hover:text-white">
      {children}
    </Link>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-gray-300 transition-colors hover:text-emerald-400 hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.45)]"
    >
      {children}
    </Link>
  )
}

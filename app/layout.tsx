import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PiPProvider } from "../lib/pip-context"
import PiPPlayer from "../components/pip-player"
import PerformanceMonitor from "../components/performance-monitor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SIPREMIUM - Premium Account Marketplace",
  description: "Marketplace for premium accounts - Netflix, Spotify, YouTube Premium and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PiPProvider>
          {children}
          <PiPPlayer />
          <PerformanceMonitor />
        </PiPProvider>
      </body>
    </html>
  )
}

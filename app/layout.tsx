import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "BMS Image Gallery",
  description: "Search images used in BMS messages",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}


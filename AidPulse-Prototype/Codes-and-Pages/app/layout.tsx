import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AidPulse - Crisis Response Platform",
  description: "AI-powered humanitarian aid and crisis response platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Only show sidebar if not on login page
  const isLoginPage = typeof window !== "undefined" && window.location.pathname === "/"

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          {!isLoginPage && <Sidebar />}
          <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'
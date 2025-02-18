"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import type React from "react"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoginPage(window.location.pathname === "/login-page");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <title>AidPulse - Crisis Response Platform</title>
        <meta name="description" content="AI-powered humanitarian aid and crisis response platform" />
        <meta name="generator" content="v0.dev" />
      </head>
      <body className={inter.className}>
        <div className="flex h-screen">
          {!isLoginPage && <Sidebar />}
          <main className="flex-1 overflow-y-auto bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  )
}

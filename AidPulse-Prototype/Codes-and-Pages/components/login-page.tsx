"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    // In a real application, this would be an API call
    if (username === "demo" && password === "password") {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LoginBackground-Ls4wGC4rAJZjRZNy1K9gyzMOk2dqIy.png"
        alt="Crisis Response Background"
        fill
        className="object-cover"
        style={{ filter: "blur(8px)" }}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <div className="flex justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aswq-NxAnQ5TqA5NoHEKDDa6HNOl4KrngEo.png"
              alt="AidPulse AI Logo"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Welcome to AidPulse</h1>
          <p className="text-center text-gray-600 mb-6">Providing humanitarian support, one step at a time.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#014826] hover:bg-[#1c6c45]">
              Login
            </Button>
          </form>

          <div className="flex justify-between mt-6 text-sm">
            <Button variant="link" className="text-[#014826] p-0">
              Forgot Password?
            </Button>
            <Button variant="link" className="text-[#014826] p-0">
              Sign Up
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


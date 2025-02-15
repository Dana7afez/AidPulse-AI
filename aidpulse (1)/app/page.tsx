"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      // For demo purposes, accept any non-empty email and password
      if (formData.email.includes("@") && formData.password.length > 0) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        router.push("/dashboard")
      } else {
        setError("Invalid email or password format")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-background">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LoginBackground-KB6AWrmp7z10zpRvLn22s17xXhnVNM.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      />

      {/* Login Card */}
      <Card className="relative w-full max-w-md mx-4 bg-background/95 backdrop-blur">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">AidPulse</span>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to AidPulse</h1>
            <p className="text-sm text-muted-foreground">Providing humanitarian support, one step at a time</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground text-center">
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary/90 underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary/90 underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Users } from "lucide-react"

// Mock data for waiting list
const waitingListData = [
  { id: 1, name: "John Doe", email: "john@example.com", date: "2024-02-15", status: "Pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2024-02-14", status: "Approved" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", date: "2024-02-13", status: "Pending" },
]

export default function WaitingListPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    // Basic validation
    if (!email || !name) {
      setError("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setName("")
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Waiting List</h1>
          <p className="text-muted-foreground">Join our waiting list for priority access to aid services.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Join the Waiting List</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert>
                    <AlertDescription className="text-green-600">
                      You have successfully joined the waiting list!
                    </AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Join Waiting List"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Current Statistics</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{waitingListData.length}</p>
                  <p className="text-sm text-muted-foreground">People Waiting</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">~14 days</p>
                  <p className="text-sm text-muted-foreground">Average Wait Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waitingListData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          entry.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


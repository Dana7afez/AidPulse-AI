"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Phone } from "lucide-react"

export default function EmergencyContact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", phone: "", message: "" })
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Emergency Contact</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="text-primary" />
              Contact Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="message">Emergency Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
              </div>
              <Button type="submit">Send Emergency Message</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="text-primary" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                <strong>Emergency Hotline:</strong> +1 (800) 123-4567
              </p>
              <p>
                <strong>Available 24/7</strong>
              </p>
              <p>
                For immediate assistance, please call our emergency hotline. Our team is available 24 hours a day, 7
                days a week to respond to urgent situations.
              </p>
              <p>
                If your situation is not urgent, please fill out the contact form, and we will get back to you as soon
                as possible.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


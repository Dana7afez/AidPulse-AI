"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle } from "lucide-react"

// Mock data for crisis zones and resources
const crisisZones = ["Zone A", "Zone B", "Zone C"]
const resources = ["Antibiotics", "Bandages", "Rice", "Water Bottles", "Vitamins"]

// Mock data for aid requests
const aidRequests = [
  { id: 1, organization: "Red Cross", crisisZone: "Zone A", resource: "Antibiotics", quantity: 500, status: "Pending" },
  {
    id: 2,
    organization: "UNICEF",
    crisisZone: "Zone B",
    resource: "Water Bottles",
    quantity: 1000,
    status: "Approved",
  },
  {
    id: 3,
    organization: "Doctors Without Borders",
    crisisZone: "Zone C",
    resource: "Bandages",
    quantity: 200,
    status: "Rejected",
  },
]

export default function AidRequestSubmission() {
  const [formData, setFormData] = useState({
    organization: "",
    crisisZone: "",
    resource: "",
    quantity: "",
    budget: "",
    additionalInfo: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Aid Request Submission Form</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submit Aid Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="crisisZone">Crisis Zone</Label>
                <Select name="crisisZone" onValueChange={(value) => handleSelectChange("crisisZone", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Crisis Zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {crisisZones.map((zone) => (
                      <SelectItem key={zone} value={zone}>
                        {zone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resource">Needed Resource</Label>
                <Select name="resource" onValueChange={(value) => handleSelectChange("resource", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Resource" />
                  </SelectTrigger>
                  <SelectContent>
                    {resources.map((resource) => (
                      <SelectItem key={resource} value={resource}>
                        {resource}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget">Expected Budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            {aidRequests.length > 0 ? (
              <div className="space-y-2">
                {aidRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between">
                    <div>
                      <strong>{request.organization}</strong> - {request.resource} ({request.quantity})
                    </div>
                    <div>
                      {request.status === "Pending" && <span className="text-yellow-500">Pending</span>}
                      {request.status === "Approved" && <span className="text-green-500">Approved</span>}
                      {request.status === "Rejected" && <span className="text-red-500">Rejected</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-500">
                <AlertCircle />
                <span>No active requests</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


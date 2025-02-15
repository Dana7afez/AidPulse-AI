"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Package, Users, Globe } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Mock data for crisis zones
const crisisZones = [
  {
    id: 1,
    name: "Zone A",
    risk: "high",
    affected: 5000,
    aidSent: 1000,
    prediction: "Increasing risk",
    location: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 2,
    name: "Zone B",
    risk: "medium",
    affected: 3000,
    aidSent: 800,
    prediction: "Stable",
    location: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 3,
    name: "Zone C",
    risk: "low",
    affected: 1000,
    aidSent: 200,
    prediction: "Improving",
    location: { lat: 51.5074, lng: 0.1278 },
  },
]

export default function CrisisMappingSystem() {
  const [selectedZone, setSelectedZone] = useState<(typeof crisisZones)[0] | null>(null)

  const totalAffected = crisisZones.reduce((sum, zone) => sum + zone.affected, 0)
  const totalAidSent = crisisZones.reduce((sum, zone) => sum + zone.aidSent, 0)

  const riskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "red"
      case "medium":
        return "yellow"
      case "low":
        return "green"
      default:
        return "gray"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crisis Mapping System</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-primary" />
              Affected Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{crisisZones.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Total Affected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalAffected.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="text-primary" />
              Total Aid Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalAidSent.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="text-primary" />
            Crisis Zones Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full bg-gray-200 relative">
            {crisisZones.map((zone) => (
              <div
                key={zone.id}
                className="absolute rounded-full h-6 w-6"
                style={{
                  top: `${50 + zone.location.lat * 0.5}%`,
                  left: `${50 + zone.location.lng * 0.5}%`,
                  backgroundColor: riskColor(zone.risk),
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full h-full rounded-full"
                      onClick={() => setSelectedZone(zone)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{zone.name} Details</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                      <div className="mt-4 space-y-2">
                        <p>
                          <strong>Risk Level:</strong> {zone.risk}
                        </p>
                        <p>
                          <strong>Affected People:</strong> {zone.affected.toLocaleString()}
                        </p>
                        <p>
                          <strong>Aid Sent:</strong> {zone.aidSent.toLocaleString()} units
                        </p>
                        <p>
                          <strong>Future Prediction:</strong> {zone.prediction}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Crisis Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crisisZones.map((zone) => (
              <Dialog key={zone.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-32 flex flex-col items-center justify-center gap-2"
                    onClick={() => setSelectedZone(zone)}
                  >
                    <span className="font-bold">{zone.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {zone.risk.charAt(0).toUpperCase() + zone.risk.slice(1)} Risk
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{zone.name} Details</DialogTitle>
                    <DialogDescription>
                      <div className="mt-4 space-y-2">
                        <p>
                          <strong>Risk Level:</strong> {zone.risk.charAt(0).toUpperCase() + zone.risk.slice(1)}
                        </p>
                        <p>
                          <strong>Affected People:</strong> {zone.affected.toLocaleString()}
                        </p>
                        <p>
                          <strong>Aid Sent:</strong> {zone.aidSent.toLocaleString()} units
                        </p>
                        <p>
                          <strong>Future Prediction:</strong> {zone.prediction}
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


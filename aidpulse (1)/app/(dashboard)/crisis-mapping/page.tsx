"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
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

const riskColors = {
  high: "red",
  medium: "yellow",
  low: "green",
}

const iconSize = [25, 41]

const createCustomIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/marker-icon-${color}.png`,
    iconSize,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })
}

export default function CrisisMappingSystem() {
  const [selectedZone, setSelectedZone] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("highPriority") === "true") {
      setHighPriorityMode(true)
    }
  }, [])

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
            <p className="text-3xl font-bold">{crisisZones.reduce((sum, zone) => sum + zone.affected, 0).toLocaleString()}</p>
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
            <p className="text-3xl font-bold">{crisisZones.reduce((sum, zone) => sum + zone.aidSent, 0).toLocaleString()}</p>
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
          <MapContainer center={[20, 0]} zoom={2} className="h-96 w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {crisisZones.map((zone) => (
              <Marker
                key={zone.id}
                position={[zone.location.lat, zone.location.lng]}
                icon={createCustomIcon(riskColors[zone.risk])}
                eventHandlers={{
                  click: () => setSelectedZone(zone),
                }}
              >
                <Popup>
                  <strong>{zone.name}</strong>
                  <br /> Risk Level: {zone.risk.charAt(0).toUpperCase() + zone.risk.slice(1)}
                  <br /> Affected: {zone.affected.toLocaleString()}
                  <br /> Aid Sent: {zone.aidSent.toLocaleString()} units
                  <br /> Prediction: {zone.prediction}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  )
}


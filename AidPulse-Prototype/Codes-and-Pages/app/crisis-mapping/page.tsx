"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Package, Users, Globe, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { GoogleMap, LoadScript, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api"

// This would typically come from your environment variables
const GOOGLE_MAPS_API_KEY = "AIzaSyDIW4dfXz2-JSI1WOBEZUEmwRMTuD7bVlE"

interface CrisisZone {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  riskLevel: "high" | "moderate" | "low"
  affectedPeople: number
  aidStatus: {
    medical: number
    food: number
    shelter: number
  }
  lastUpdate: string
  predictions: string[]
}

const mockCrisisZones: CrisisZone[] = [
  {
    id: "1",
    name: "Northern Region",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    riskLevel: "high",
    affectedPeople: 15000,
    aidStatus: {
      medical: 65,
      food: 45,
      shelter: 80,
    },
    lastUpdate: "2024-02-16T10:30:00Z",
    predictions: ["Potential medical supply shortage in 2 weeks", "Weather conditions may affect aid distribution"],
  },
  {
    id: "2",
    name: "Southern region",
    coordinates: { lat: 31.2001, lng: 29.9187 },
    riskLevel: "moderate",
    affectedPeople: 8000,
    aidStatus: {
      medical: 75,
      food: 60,
      shelter: 70,
    },
    lastUpdate: "2024-02-17T09:15:00Z",
    predictions: ["Increasing demand for medical supplies", "Need for additional food distribution centers"],
  },
  {
    id: "3",
    name: "Eastren region",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    riskLevel: "low",
    affectedPeople: 5000,
    aidStatus: {
      medical: 85,
      food: 80,
      shelter: 90,
    },
    lastUpdate: "2024-02-18T11:45:00Z",
    predictions: ["Stable conditions expected to continue", "Potential for resource reallocation to higher-risk areas"],
  },
]

export default function CrisisMappingPage() {
  const [selectedZone, setSelectedZone] = useState<CrisisZone | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [totalAffected, setTotalAffected] = useState(0)
  const [activeZones, setActiveZones] = useState(0)
  const [crisisZones, setCrisisZones] = useState(mockCrisisZones)
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([])

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"]
  })

  useEffect(() => {
    // Calculate totals
    const affected = crisisZones.reduce((acc, zone) => acc + zone.affectedPeople, 0)
    setTotalAffected(affected)
    setActiveZones(crisisZones.length)

    // Simulate dynamic aid distribution changes
    const interval = setInterval(() => {
      setCrisisZones((prevZones) =>
        prevZones.map((zone) => ({
          ...zone,
          aidStatus: {
            medical: Math.min(100, Math.max(0, zone.aidStatus.medical + Math.random() * 10 - 5)),
            food: Math.min(100, Math.max(0, zone.aidStatus.food + Math.random() * 10 - 5)),
            shelter: Math.min(100, Math.max(0, zone.aidStatus.shelter + Math.random() * 10 - 5)),
          },
        })),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [crisisZones])

  useEffect(() => {
    if (isLoaded) {
      const data = crisisZones.map(zone => ({
        location: new google.maps.LatLng(zone.coordinates.lat, zone.coordinates.lng),
        weight: zone.affectedPeople,
      }))
      setHeatmapData(data)
    }
  }, [isLoaded, crisisZones])

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-500"
      case "moderate":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const gradient = [
    'rgba(0, 255, 0, 0)',
    'rgba(0, 255, 0, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(255, 0, 0, 1)',
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Crisis Mapping</h1>
        <Button onClick={() => (window.location.href = "/resource-distribution")}>Distribute Resources</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAffected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">People in crisis zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crisis Zones</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeZones}</div>
            <p className="text-xs text-muted-foreground">Across all regions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aid Distribution</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                crisisZones.reduce(
                  (acc, zone) => acc + (zone.aidStatus.medical + zone.aidStatus.food + zone.aidStatus.shelter) / 3,
                  0,
                ) / crisisZones.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average coverage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Impact</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Countries affected</p>
          </CardContent>
        </Card>
      </div>

      {/* Map Container */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Crisis Zone Map</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px] relative">
          {loadError ? (
            <div>Error loading map</div>
          ) : !isLoaded ? (
            <div>Loading map...</div>
          ) : (
            <GoogleMap
              id="map"
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={{ lat: 0, lng: 0 }}
              zoom={2}
            >
              <HeatmapLayer data={heatmapData} options={{ radius: 50, gradient }} />
            </GoogleMap>
          )}
        </CardContent>
      </Card>

      {/* Crisis Zones List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crisisZones.map((zone) => (
          <Card
            key={zone.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedZone(zone)
              setIsDetailsOpen(true)
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{zone.name}</CardTitle>
              <Badge className={getRiskBadgeColor(zone.riskLevel)}>{zone.riskLevel.toUpperCase()}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Affected People:</span>
                  <span className="font-medium">{zone.affectedPeople.toLocaleString()}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Aid Status:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${zone.aidStatus.medical}%` }} />
                      </div>
                      <span className="text-sm">Medical {Math.round(zone.aidStatus.medical)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${zone.aidStatus.food}%` }} />
                      </div>
                      <span className="text-sm">Food {Math.round(zone.aidStatus.food)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `${zone.aidStatus.shelter}%` }} />
                      </div>
                      <span className="text-sm">Shelter {Math.round(zone.aidStatus.shelter)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Crisis Zone Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedZone?.name}
              <Badge className={getRiskBadgeColor(selectedZone?.riskLevel || "low")}>
                {selectedZone?.riskLevel.toUpperCase()}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Last updated: {new Date(selectedZone?.lastUpdate || "").toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Current Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Affected People:</span>
                    <span>{selectedZone?.affectedPeople.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medical Aid:</span>
                    <span>{Math.round(selectedZone?.aidStatus.medical || 0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Food Supply:</span>
                    <span>{Math.round(selectedZone?.aidStatus.food || 0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shelter Coverage:</span>
                    <span>{Math.round(selectedZone?.aidStatus.shelter || 0)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Predictions</h4>
                <ul className="space-y-2">
                  {selectedZone?.predictions.map((prediction, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{prediction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsDetailsOpen(false)
                  // Navigate to resource distribution
                  window.location.href = "/resource-distribution"
                }}
              >
                Manage Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Package, AlertCircle, HeartPulseIcon as Heartbeat, Syringe, Truck, Globe } from "lucide-react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

export default function DashboardPage() {
  const [activePatients, setActivePatients] = useState(2350)
  const [activeCrises, setActiveCrises] = useState(12)
  const [medicalSupplies, setMedicalSupplies] = useState(85)
  const [responseTime, setResponseTime] = useState(24)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePatients((prev) => prev + Math.floor(Math.random() * 10) - 5)
      setActiveCrises((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
      setMedicalSupplies((prev) => Math.min(100, Math.max(0, prev + Math.floor(Math.random() * 5) - 2)))
      setResponseTime((prev) => Math.max(1, prev + Math.floor(Math.random() * 5) - 2))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Aid Distributed",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Crisis Severity",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePatients}</div>
            <p className="text-xs text-muted-foreground">+2% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crises</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrises}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Supplies</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicalSupplies}%</div>
            <p className="text-xs text-muted-foreground">Stock level</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{responseTime}min</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aid Distribution Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barChartData} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Crisis Severity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={lineChartData} />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vaccinations</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Administered today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aid Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">En route to crisis zones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Countries served</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Index</CardTitle>
            <Heartbeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Overall improvement</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


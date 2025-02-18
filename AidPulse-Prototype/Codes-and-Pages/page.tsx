"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types for our patient data
type Priority = "Critical" | "Moderate" | "Stable"
type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"

interface Patient {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  bloodType: BloodType
  priority: Priority
  conditions: string[]
  lastUpdate: string
  upcomingAppointment?: string
}

// Generate random patient data
const generatePatients = (count: number): Patient[] => {
  const names = [
    "Emma Thompson",
    "James Wilson",
    "Sarah Parker",
    "Michael Chen",
    "Lisa Rodriguez",
    "David Kim",
    "Maria Garcia",
    "John Smith",
    "Rachel Lee",
    "Ahmed Hassan",
    "Sofia Patel",
    "William Brown",
    "Olivia Davis",
    "Yuki Tanaka",
    "Carlos Santos",
    "Anna Kowalski",
    "Robert Johnson",
    "Fatima Ali",
    "Thomas Anderson",
    "Nina Patel",
  ]

  const conditions = [
    "Diabetes Type 2",
    "Hypertension",
    "Asthma",
    "Heart Disease",
    "Arthritis",
    "Chronic Kidney Disease",
    "COPD",
    "Depression",
    "Anxiety",
    "Cancer",
    "Multiple Sclerosis",
    "Alzheimer's",
    "Parkinson's",
    "Epilepsy",
    "Migraine",
  ]

  const priorities: Priority[] = ["Critical", "Moderate", "Stable"]
  const bloodTypes: BloodType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  const genders = ["Male", "Female"]

  return Array.from({ length: count }, (_, i) => {
    const randomConditionsCount = Math.floor(Math.random() * 3) + 1
    const patientConditions = Array.from(
      { length: randomConditionsCount },
      () => conditions[Math.floor(Math.random() * conditions.length)],
    )

    const priority = priorities[Math.floor(Math.random() * priorities.length)] as Priority
    const age = Math.floor(Math.random() * 70) + 18 // Ages 18-88

    // Generate a random date within the last 30 days
    const lastUpdate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString()

    return {
      id: `MED-2024-${(i + 1).toString().padStart(3, "0")}`,
      name: names[Math.floor(Math.random() * names.length)],
      age,
      gender: genders[Math.floor(Math.random() * genders.length)] as "Male" | "Female",
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      priority,
      conditions: patientConditions,
      lastUpdate,
      upcomingAppointment:
        Math.random() > 0.5
          ? new Date(Date.now() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000).toLocaleDateString()
          : undefined,
    }
  })
}

export default function MedicalIDSystem() {
  const [patients] = useState<Patient[]>(generatePatients(50))
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filterPatients = (patients: Patient[]) => {
    let filtered = [...patients]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          patient.conditions.some((condition) => condition.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply type filter
    switch (filterType) {
      case "critical":
        filtered = filtered.filter((p) => p.priority === "Critical")
        break
      case "moderate":
        filtered = filtered.filter((p) => p.priority === "Moderate")
        break
      case "stable":
        filtered = filtered.filter((p) => p.priority === "Stable")
        break
      case "youngest":
        filtered.sort((a, b) => a.age - b.age)
        break
      case "oldest":
        filtered.sort((a, b) => b.age - a.age)
        break
      case "recent":
        filtered.sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
        break
    }

    return filtered
  }

  const filteredPatients = filterPatients(patients)

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500"
      case "Moderate":
        return "bg-yellow-500"
      case "Stable":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <img
              src="https://raw.githubusercontent.com/Dana7afez/AidPulse-AI/refs/heads/main/images/Logo.png"
              alt="AidPulse Logo"
              className="h-10 w-auto"
            />
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or condition..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                <SelectItem value="critical">Critical Priority</SelectItem>
                <SelectItem value="moderate">Moderate Priority</SelectItem>
                <SelectItem value="stable">Stable Priority</SelectItem>
                <SelectItem value="youngest">Youngest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
            <Button>Create Appointment</Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="grid grid-cols-[300px_1fr] gap-6">
          {/* Patient List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-muted">
              <h2 className="font-semibold">Patients ({filteredPatients.length})</h2>
            </div>
            <div className="divide-y h-[calc(100vh-180px)] overflow-auto">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                    selectedPatient?.id === patient.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{patient.name}</span>
                    <Badge className={getPriorityColor(patient.priority)}>{patient.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {patient.age} years • {patient.gender}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Last updated: {patient.lastUpdate}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          {selectedPatient ? (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg" alt={selectedPatient.name} />
                  <AvatarFallback>
                    {selectedPatient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{selectedPatient.name}</h2>
                    <Badge variant="outline">{selectedPatient.id}</Badge>
                    <Badge className={getPriorityColor(selectedPatient.priority)}>{selectedPatient.priority}</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {selectedPatient.gender} • {selectedPatient.age} years • Blood Type: {selectedPatient.bloodType}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chronic Conditions: {selectedPatient.conditions.join(", ")}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general">General Health</TabsTrigger>
                  <TabsTrigger value="treatment">Treatment History</TabsTrigger>
                  <TabsTrigger value="ongoing">Ongoing Treatments</TabsTrigger>
                  <TabsTrigger value="notes">Doctor's Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Next Appointment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedPatient.upcomingAppointment ? (
                          <p>{selectedPatient.upcomingAppointment}</p>
                        ) : (
                          <p className="text-muted-foreground">No upcoming appointments</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Conditions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedPatient.conditions.map((condition, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Badge variant="outline">{condition}</Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Last Update</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{selectedPatient.lastUpdate}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Treatments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Diabetes Management Review</h4>
                            <p className="text-sm text-muted-foreground">Dr. Sarah Chen • Feb 10, 2024</p>
                          </div>
                          <Badge variant="success">Completed</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Blood Pressure Medication Adjustment</h4>
                            <p className="text-sm text-muted-foreground">Dr. Michael Ross • Jan 28, 2024</p>
                          </div>
                          <Badge variant="success">Completed</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ongoing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Treatments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cardiac Evaluation</h4>
                            <p className="text-sm text-muted-foreground">Scheduled: Feb 20, 2024</p>
                          </div>
                          <Badge variant="warning">Pending</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Physical Therapy</h4>
                            <p className="text-sm text-muted-foreground">Weekly Sessions</p>
                          </div>
                          <Badge>Ongoing</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Doctor's Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-l-4 border-primary p-4 bg-muted/50">
                          <p className="text-sm">
                            Patient shows improvement in glucose levels but needs continued monitoring. Recommended
                            lifestyle changes are being followed consistently.
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">- Dr. Sarah Chen, Feb 10, 2024</p>
                        </div>
                        <div className="border-l-4 border-primary p-4 bg-muted/50">
                          <p className="text-sm">
                            Blood pressure medication dosage adjusted. Patient to monitor BP daily and report any
                            significant changes.
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">- Dr. Michael Ross, Jan 28, 2024</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a patient to view their details
            </div>
          )}
        </div>
      </main>
    </div>
  )
}


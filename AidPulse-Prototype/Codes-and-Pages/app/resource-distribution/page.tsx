"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Package, AlertTriangle, Search, Filter } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Resource {
  id: string
  name: string
  category: "Medicine" | "Food" | "Supplements"
  quantity: number
  threshold: number
  status: "In Stock" | "Low Stock" | "Critical"
  lastUpdated: string
}

interface AidRequest {
  id: string
  hospital: string
  location: string
  urgency: "High" | "Medium" | "Low"
  resources: {
    name: string
    quantity: number
  }[]
  status: "Pending" | "Approved" | "Rejected"
  requestDate: string
}

const mockResources: Resource[] = [
  {
    id: "1",
    name: "Antibiotics",
    category: "Medicine",
    quantity: 500,
    threshold: 1000,
    status: "Low Stock",
    lastUpdated: "2024-02-16T10:30:00Z",
  },
  {
    id: "2",
    name: "Emergency Food Kits",
    category: "Food",
    quantity: 2000,
    threshold: 1500,
    status: "In Stock",
    lastUpdated: "2024-02-16T09:15:00Z",
  },
  {
    id: "3",
    name: "Vitamin Supplements",
    category: "Supplements",
    quantity: 100,
    threshold: 300,
    status: "Critical",
    lastUpdated: "2024-02-16T11:45:00Z",
  },
  // Add more mock data as needed
]

const mockRequests: AidRequest[] = [
  {
    id: "REQ-001",
    hospital: "Central Hospital",
    location: "Northern Region",
    urgency: "High",
    resources: [
      { name: "Antibiotics", quantity: 200 },
      { name: "Emergency Food Kits", quantity: 100 },
    ],
    status: "Pending",
    requestDate: "2024-02-16T08:00:00Z",
  },
  // Add more mock data as needed
]

export default function ResourceDistributionPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [requests] = useState<AidRequest[]>(mockRequests)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [distributionRate, setDistributionRate] = useState(92)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate changing distribution rate
      setDistributionRate((prevRate) => {
        const change = Math.random() * 2 - 1 // Random change between -1 and 1
        return Math.min(100, Math.max(0, prevRate + change))
      })

      // Simulate changing resource quantities
      setResources((prevResources) =>
        prevResources.map((resource) => ({
          ...resource,
          quantity: Math.max(0, resource.quantity + Math.floor(Math.random() * 21) - 10), // Random change between -10 and 10
          lastUpdated: new Date().toISOString(),
        })),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-500"
      case "Low Stock":
        return "bg-yellow-500"
      case "In Stock":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredResources = resources.filter((resource) => {
    if (categoryFilter !== "all" && resource.category !== categoryFilter) {
      return false
    }
    if (searchQuery) {
      return resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Resource Distribution</h2>
      </div>

      {/* Critical Alerts */}
      <div className="space-y-4">
        {resources
          .filter((r) => r.status === "Critical")
          .map((resource) => (
            <Alert key={resource.id} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Critical Stock Alert</AlertTitle>
              <AlertDescription>
                {resource.name} is below critical threshold. Current stock: {resource.quantity} units
              </AlertDescription>
            </Alert>
          ))}
      </div>

      {/* Inventory Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Inventory Management</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Medicine">Medicine</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Supplements">Supplements</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.category}</TableCell>
                  <TableCell>{resource.quantity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(resource.lastUpdated).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Update Stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Aid Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Aid Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Requested Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {request.resources.map((resource, index) => (
                        <li key={index} className="text-sm">
                          {resource.name}: {resource.quantity} units
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{new Date(request.requestDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Distribution Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.reduce((acc, r) => acc + r.quantity, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Units in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.filter((r) => r.status === "Critical").length}</div>
            <p className="text-xs text-muted-foreground">Items below threshold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter((r) => r.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribution Rate</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{distributionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Resources delivered successfully</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


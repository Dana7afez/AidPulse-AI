"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Package, Pill, Utensils } from "lucide-react"

// Mock data for inventory
const initialInventory = [
  { id: 1, name: "Antibiotics", category: "Medicine", stock: 5000, critical: 1000 },
  { id: 2, name: "Bandages", category: "Medicine", stock: 10000, critical: 2000 },
  { id: 3, name: "Rice", category: "Food", stock: 20000, critical: 5000 },
  { id: 4, name: "Water Bottles", category: "Food", stock: 30000, critical: 10000 },
  { id: 5, name: "Vitamins", category: "Supplements", stock: 15000, critical: 3000 },
]

// Mock data for aid requests
const aidRequests = [
  { id: 1, hospital: "Central Hospital", zone: "Zone A", resources: "Antibiotics", quantity: 1000, urgency: "High" },
  { id: 2, hospital: "City Clinic", zone: "Zone B", resources: "Bandages", quantity: 5000, urgency: "Medium" },
  { id: 3, hospital: "Rural Health Center", zone: "Zone C", resources: "Rice", quantity: 10000, urgency: "Low" },
]

export default function ResourceDistributionManagement() {
  const [inventory, setInventory] = useState(initialInventory)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const interval = setInterval(() => {
      setInventory((prevInventory) => {
        return prevInventory.map((item) => {
          const stockChange = Math.floor(Math.random() * 2000) - 1000 // Random change between -1000 and 1000
          const newStock = Math.max(0, item.stock + stockChange) // Ensure stock doesn't go below 0
          return { ...item, stock: newStock }
        })
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredInventory = inventory.filter((item) =>
    filter === "all" ? true : item.category.toLowerCase() === filter,
  )

  const categoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "medicine":
        return <Pill className="text-blue-500" />
      case "food":
        return <Utensils className="text-green-500" />
      case "supplements":
        return <Package className="text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resource Distribution Management</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="text-primary" />
            Live Inventory Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="supplements">Supplements</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {categoryIcon(item.category)}
                    {item.category}
                  </TableCell>
                  <TableCell>{item.stock.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.stock <= item.critical ? (
                      <span className="flex items-center gap-1 text-red-500 font-bold">
                        <AlertCircle size={16} />
                        LOW STOCK!
                      </span>
                    ) : (
                      <span className="text-green-500">Sufficient</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Aid Request Approval Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital</TableHead>
                <TableHead>Crisis Zone</TableHead>
                <TableHead>Needed Resources</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aidRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.hospital}</TableCell>
                  <TableCell>{request.zone}</TableCell>
                  <TableCell>{request.resources}</TableCell>
                  <TableCell>{request.quantity.toLocaleString()}</TableCell>
                  <TableCell>{request.urgency}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
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
    </div>
  )
}


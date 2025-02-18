"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WaitingListItem {
  id: string
  name: string
  age: number
  gender: string
  condition: string
  priority: "Low" | "Medium" | "High"
  reason: string
  dateAdded: string
}

const mockWaitingList: WaitingListItem[] = [
  {
    id: "WL001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    condition: "Chronic Heart Disease",
    priority: "Medium",
    reason: "Stable condition, but requires regular check-ups",
    dateAdded: "2024-02-15T10:30:00Z",
  },
  {
    id: "WL002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    condition: "Asthma",
    priority: "Low",
    reason: "Mild symptoms, can be managed with current medication",
    dateAdded: "2024-02-14T14:45:00Z",
  },
  {
    id: "WL003",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    condition: "Type 2 Diabetes",
    priority: "High",
    reason: "Recent complications, needs immediate attention",
    dateAdded: "2024-02-16T09:15:00Z",
  },
  // Add more mock data as needed
]

export default function WaitingListPage() {
  const [waitingList, setWaitingList] = useState<WaitingListItem[]>(mockWaitingList)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const filteredList = waitingList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = priorityFilter === "all" || item.priority.toLowerCase() === priorityFilter.toLowerCase()
    return matchesSearch && matchesPriority
  })

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Waiting List for Aid</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Secondary Priority Patients</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
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
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.gender}</TableCell>
                  <TableCell>{item.condition}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                  </TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell>{new Date(item.dateAdded).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
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


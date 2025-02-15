"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import patientsData from "./patients_database-pLs3cGLW1VQ1jwWAIZ7oyxdOv4l6iV.json"
// Mock data for patients
const patients = patientsData

export default function MedicalIDSystem() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const patientsPerPage = 10
  const router = useRouter()

  const filteredPatients = patients.filter(
    (patient) =>
      (filter === "all" || patient.priority === filter) && patient.name.toLowerCase().includes(search.toLowerCase()),
  )

  const highPriorityPatients = patients.filter((patient) => patient.priority === "High")

  const pageCount = Math.ceil(filteredPatients.length / patientsPerPage)
  const displayedPatients = filteredPatients.slice((currentPage - 1) * patientsPerPage, currentPage * patientsPerPage)

  const priorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return "🔴"
      case "Medium":
        return "🟡"
      case "Low":
        return "🟢"
      default:
        return null
    }
  }

  const handleHighPriorityAllocation = () => {
    router.push("/crisis-mapping?highPriority=true")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Medical ID System</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter and Search Patients</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Select onValueChange={setFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High Priority</SelectItem>
              <SelectItem value="Medium">Medium Priority</SelectItem>
              <SelectItem value="Low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">High Priority Allocation</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Allocate High Priority Patients</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will filter only high priority patients and take you to the Crisis Mapping page to
                  allocate them. Do you want to proceed?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleHighPriorityAllocation}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {priorityIcon(patient.priority)}
                    {patient.priority}
                  </TableCell>
                  <TableCell>{patient.medical_condition}</TableCell>
                  <TableCell>{patient.bloodType}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedPatient?.name} - Medical Record</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <div className="space-y-2">
                            <p>
                              <strong>Age:</strong> {selectedPatient?.age}
                            </p>
                            <p>
                              <strong>Priority:</strong> {selectedPatient?.priority}
                            </p>
                            <p>
                              <strong>Medical Condition:</strong> {selectedPatient?.medical_condition}
                            </p>
                            <p>
                              <strong>Gender:</strong> {selectedPatient?.gender}
                            </p>
                            <p>
                              <strong>Location:</strong> {selectedPatient?.location}
                            </p>
                            <p>
                              <strong>Blood Type:</strong> {selectedPatient?.bloodType}
                            </p>
                          </div>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <div>
              Showing {(currentPage - 1) * patientsPerPage + 1} -{" "}
              {Math.min(currentPage * patientsPerPage, filteredPatients.length)} of {filteredPatients.length}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                disabled={currentPage === pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


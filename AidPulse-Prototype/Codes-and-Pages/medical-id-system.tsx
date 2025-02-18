import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Patient = {
  id: number
  name: string
  dob: string
  mrn: string
}

export default function MedicalIDSystem() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [mrn, setMrn] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPatient: Patient = {
      id: patients.length + 1,
      name,
      dob,
      mrn,
    }
    setPatients([...patients, newPatient])
    setName("")
    setDob("")
    setMrn("")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Medical ID System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Patient</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="mrn">Medical Record Number</Label>
              <Input id="mrn" value={mrn} onChange={(e) => setMrn(e.target.value)} required />
            </div>
            <Button type="submit">Add Patient</Button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Patient Records</h2>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>MRN</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.dob}</TableCell>
                    <TableCell>{patient.mrn}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}


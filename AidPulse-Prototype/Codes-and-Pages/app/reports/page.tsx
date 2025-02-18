"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, TrendingUp, Users, AlertCircle } from "lucide-react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Mock data
const reportsData = {
  totalPatients: 2350,
  criticalCases: 89,
  activeCrises: 12,
  monthlyStats: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Patient Admissions",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
  recentReports: [
    {
      id: 1,
      title: "Monthly Health Assessment",
      date: "2024-02-15",
      type: "Health",
      status: "Completed",
    },
    {
      id: 2,
      title: "Crisis Response Analysis",
      date: "2024-02-14",
      type: "Crisis",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Resource Distribution Report",
      date: "2024-02-13",
      type: "Resources",
      status: "Pending",
    },
  ],
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("all")

  const filteredReports = reportsData.recentReports.filter(
    (report) => reportType === "all" || report.type.toLowerCase() === reportType.toLowerCase(),
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Insights</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.totalPatients}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.criticalCases}</div>
            <p className="text-xs text-muted-foreground">-5% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crises</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.activeCrises}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Admissions Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={reportsData.monthlyStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Reports</CardTitle>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="health">Health Reports</SelectItem>
              <SelectItem value="crisis">Crisis Reports</SelectItem>
              <SelectItem value="resources">Resource Reports</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {report.title}
                  </TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : report.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
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


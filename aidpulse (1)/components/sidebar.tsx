"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  AlertCircle,
  Shield,
  ClipboardList,
  LogOut,
  Clock,
} from "lucide-react"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Medical ID System",
    href: "/medical-id",
    icon: Users,
  },
  {
    title: "Crisis Mapping",
    href: "/crisis-mapping",
    icon: AlertCircle,
  },
  {
    title: "Resource Distribution",
    href: "/resource-distribution",
    icon: Package,
  },
  {
    title: "Aid Request",
    href: "/aid-request",
    icon: FileText,
  },
  {
    title: "Reports & Insights",
    href: "/reports",
    icon: ClipboardList,
  },
  {
    title: "Emergency Contact",
    href: "/emergency-contact",
    icon: AlertCircle,
  },
  {
    title: "Security & Privacy",
    href: "/security",
    icon: Shield,
  },
  {
    title: "Waiting List",
    href: "/waiting-list",
    icon: Clock,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <img
            src="https://raw.githubusercontent.com/Dana7afez/AidPulse-AI/refs/heads/main/images/Logo.png"
            alt="AidPulse Logo"
            className="logo"
            width="70"
          />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === link.href ? "bg-accent" : "transparent",
              )}
            >
              <link.icon className="size-4" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <LogOut className="size-4" />
          Logout
        </Link>
      </div>
    </div>
  )
}


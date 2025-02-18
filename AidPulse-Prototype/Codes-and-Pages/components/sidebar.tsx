"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Users, Map, Package, FileText, BarChart2, PhoneCall, Shield, Clock, LogOut } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Medical ID System", href: "/medical-id", icon: Users },
  { name: "Crisis Mapping", href: "/crisis-mapping", icon: Map },
  { name: "Resource Distribution", href: "/resource-distribution", icon: Package },
  { name: "Aid Request", href: "/aid-request", icon: FileText },
  { name: "Reports & Insights", href: "/reports", icon: BarChart2 },
  { name: "Emergency Contact", href: "/emergency-contact", icon: PhoneCall },
  { name: "Security & Privacy", href: "/security", icon: Shield },
  { name: "Waiting List", href: "/waiting-list", icon: Clock },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // Here you would typically clear any authentication tokens or user data
    // For this example, we'll just redirect to the login page
    router.push("/")
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-white border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aswq-NxAnQ5TqA5NoHEKDDa6HNOl4KrngEo.png"
          alt="AidPulse AI Logo"
          width={80}
          height={30}
          priority
        />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", pathname === item.href && "bg-gray-100 text-[#014826]")}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
          <LogOut className="w-5 h-5 mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  )
}


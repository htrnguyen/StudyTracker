"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, BarChart3, CheckSquare, ListTodo, Home, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Tổng quan",
    href: "/",
    icon: Home,
  },
  {
    title: "Pomodoro",
    href: "/pomodoro",
    icon: Clock,
  },
  {
    title: "Công việc",
    href: "/tasks",
    icon: ListTodo,
  },
  {
    title: "Check-in",
    href: "/check-in",
    icon: CheckSquare,
  },
  {
    title: "Thống kê",
    href: "/stats",
    icon: BarChart3,
  },
  {
    title: "Nhắc nhở",
    href: "/reminders",
    icon: Calendar,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Clock className="h-5 w-5" />
          <span>Study Tracker</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/60",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

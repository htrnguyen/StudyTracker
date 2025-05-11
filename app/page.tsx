import { DashboardCard } from "@/components/ui/dashboard-card"
import { PomodoroTimer } from "@/components/pomodoro/timer"
import { StreakTracker } from "@/components/check-in/streak-tracker"
import { StreakChart } from "@/components/stats/streak-chart"
import { PomodoroStats } from "@/components/stats/pomodoro-stats"
import { ApiFallback } from "@/components/fallback-ui"
import { Clock, ListTodo, CheckSquare, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tổng quan</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <DashboardCard title="Pomodoro Timer" icon={<Clock className="h-4 w-4" />}>
          <div className="pt-2">
            <PomodoroTimer />
          </div>
        </DashboardCard>

        <DashboardCard title="Chuỗi ngày học liên tiếp" icon={<CheckSquare className="h-4 w-4" />}>
          <div className="pt-2">
            <StreakTracker />
          </div>
        </DashboardCard>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold">Thống kê</h2>
        <PomodoroStats />
        <StreakChart />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Truy cập nhanh</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <Link href="/pomodoro">
            <Button variant="outline" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Pomodoro Timer
            </Button>
          </Link>

          <Link href="/tasks">
            <Button variant="outline" className="w-full justify-start">
              <ListTodo className="mr-2 h-4 w-4" />
              Quản lý công việc
            </Button>
          </Link>

          <Link href="/check-in">
            <Button variant="outline" className="w-full justify-start">
              <CheckSquare className="mr-2 h-4 w-4" />
              Check-in hôm nay
            </Button>
          </Link>

          <Link href="/stats">
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Xem thống kê
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-8">
        <ApiFallback />
      </div>
    </div>
  )
}

import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { StreakCalendar } from "@/components/streak-calendar"
import { RecentTasks } from "@/components/recent-tasks"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Home() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <Suspense fallback={<LoadingSpinner />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PomodoroTimer />
          <Suspense fallback={<LoadingSpinner />}>
            <StreakCalendar />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<LoadingSpinner />}>
            <RecentTasks />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

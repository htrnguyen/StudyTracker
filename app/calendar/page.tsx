import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudyCalendar } from "@/components/study-calendar"
import { UpcomingReminders } from "@/components/upcoming-reminders"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Lịch học tập</h1>
        <p className="text-muted-foreground">Xem lịch học tập và nhắc nhở sắp tới</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lịch học tập</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingSpinner />}>
              <StudyCalendar />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nhắc nhở sắp tới</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingSpinner />}>
              <UpcomingReminders />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

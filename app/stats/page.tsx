import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudyTimeChart } from "@/components/study-time-chart"
import { TaskCompletionChart } from "@/components/task-completion-chart"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Thống kê Học tập</h1>
        <p className="text-muted-foreground">Theo dõi tiến độ học tập và hoàn thành công việc của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thời gian học tập</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingSpinner />}>
              <StudyTimeChart />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoàn thành công việc</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoadingSpinner />}>
              <TaskCompletionChart />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

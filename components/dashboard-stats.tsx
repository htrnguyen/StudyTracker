import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckSquare, Award, Calendar } from "lucide-react"

export async function DashboardStats() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const stats = {
    totalStudyTime: "25 giờ",
    completedTasks: 12,
    currentStreak: 5,
    longestStreak: 14,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng thời gian học</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalStudyTime}</div>
          <p className="text-xs text-muted-foreground">Trong tháng này</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Công việc đã hoàn thành</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedTasks}</div>
          <p className="text-xs text-muted-foreground">+2 so với tuần trước</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chuỗi ngày hiện tại</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.currentStreak} ngày</div>
          <p className="text-xs text-muted-foreground">Tiếp tục duy trì!</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chuỗi ngày dài nhất</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.longestStreak} ngày</div>
          <p className="text-xs text-muted-foreground">Kỷ lục cá nhân</p>
        </CardContent>
      </Card>
    </div>
  )
}

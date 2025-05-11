import { PomodoroStats } from "@/components/stats/pomodoro-stats"
import { StreakChart } from "@/components/stats/streak-chart"

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Thống kê Học tập</h1>
      <p className="text-muted-foreground">Theo dõi tiến độ học tập của bạn qua các chỉ số và biểu đồ trực quan.</p>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Thống kê Pomodoro</h2>
        <PomodoroStats />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Biểu đồ thời gian học tập</h2>
        <StreakChart />
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Hiểu về thống kê của bạn</h2>
        <p>
          Các thống kê này giúp bạn theo dõi hiệu suất học tập theo thời gian. Bằng cách phân tích dữ liệu này, bạn có
          thể:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Xác định thời điểm trong ngày bạn học hiệu quả nhất</li>
          <li>Theo dõi sự tiến bộ và duy trì động lực</li>
          <li>Điều chỉnh lịch trình học tập để tối ưu hóa hiệu suất</li>
          <li>Đặt mục tiêu thực tế dựa trên dữ liệu lịch sử</li>
        </ul>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { PlusCircle, Bell, Calendar, Clock } from "lucide-react"

export function UpcomingReminders() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const reminders = [
    {
      id: 1,
      title: "Phiên Pomodoro",
      description: "Học Toán",
      start_time: "2023-08-15T09:00:00Z",
      end_time: "2023-08-15T09:25:00Z",
    },
    {
      id: 2,
      title: "Nhắc nhở check-in",
      description: "Đừng quên check-in hôm nay",
      start_time: "2023-08-15T19:00:00Z",
      end_time: "2023-08-15T19:15:00Z",
    },
    {
      id: 3,
      title: "Hoàn thành bài tập",
      description: "Bài tập Tiếng Anh",
      start_time: "2023-08-16T14:00:00Z",
      end_time: "2023-08-16T15:00:00Z",
    },
  ]

  // Hàm định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit" })
  }

  // Hàm định dạng giờ
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  }

  // Kiểm tra xem sự kiện có phải là hôm nay không
  const isToday = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm nhắc nhở
        </Button>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-muted-foreground">{reminder.description}</p>

                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{isToday(reminder.start_time) ? "Hôm nay" : formatDate(reminder.start_time)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatTime(reminder.start_time)} - {formatTime(reminder.end_time)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {reminders.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">Không có nhắc nhở nào sắp tới</div>
        )}
      </div>
    </div>
  )
}

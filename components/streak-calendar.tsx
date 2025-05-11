import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function StreakCalendar() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const streakData = {
    current_streak: 5,
    dates: ["2023-08-10", "2023-08-11", "2023-08-12", "2023-08-13", "2023-08-14"],
  }

  // Tạo lịch cho tháng hiện tại
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Ngày đầu tiên của tháng
  const firstDay = new Date(currentYear, currentMonth, 1)
  // Ngày cuối cùng của tháng
  const lastDay = new Date(currentYear, currentMonth + 1, 0)

  // Số ngày trong tháng
  const daysInMonth = lastDay.getDate()

  // Ngày trong tuần của ngày đầu tiên (0 = Chủ Nhật, 1 = Thứ Hai, ...)
  const firstDayOfWeek = firstDay.getDay()

  // Tạo mảng các ngày trong tháng
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Tạo mảng các ngày đã check-in
  const checkedInDays = streakData.dates.map((date) => new Date(date).getDate())

  // Tên các ngày trong tuần
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chuỗi ngày học tập</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">Chuỗi ngày hiện tại</p>
          <p className="text-3xl font-bold">{streakData.current_streak} ngày</p>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdays.map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}

          {/* Khoảng trống trước ngày đầu tiên */}
          {Array.from({ length: firstDayOfWeek }, (_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}

          {/* Các ngày trong tháng */}
          {days.map((day) => {
            const isToday = day === today.getDate()
            const isCheckedIn = checkedInDays.includes(day)
            const isPast = day < today.getDate()

            return (
              <div
                key={day}
                className={`
                  h-8 flex items-center justify-center rounded-full text-sm
                  ${isToday ? "border border-blue-500" : ""}
                  ${isCheckedIn ? "bg-green-500 text-white" : ""}
                  ${isPast && !isCheckedIn ? "bg-red-100 text-red-500" : ""}
                `}
              >
                {day}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

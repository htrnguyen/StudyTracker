"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StudyCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Tạo mảng các tháng trong tiếng Việt
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  // Tạo mảng các ngày trong tuần
  const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

  // Hàm chuyển đến tháng trước
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Hàm chuyển đến tháng sau
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Hàm lấy số ngày trong tháng
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Hàm lấy ngày đầu tiên của tháng
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Tạo dữ liệu giả về các phiên học tập
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const studySessions = [
    { date: new Date(2023, 7, 1), duration: 25 },
    { date: new Date(2023, 7, 3), duration: 50 },
    { date: new Date(2023, 7, 5), duration: 30 },
    { date: new Date(2023, 7, 8), duration: 45 },
    { date: new Date(2023, 7, 10), duration: 25 },
    { date: new Date(2023, 7, 12), duration: 60 },
    { date: new Date(2023, 7, 15), duration: 25 },
    { date: new Date(2023, 7, 17), duration: 40 },
    { date: new Date(2023, 7, 20), duration: 30 },
    { date: new Date(2023, 7, 22), duration: 25 },
    { date: new Date(2023, 7, 24), duration: 50 },
    { date: new Date(2023, 7, 27), duration: 35 },
    { date: new Date(2023, 7, 29), duration: 25 },
  ]

  // Hàm kiểm tra xem ngày có phiên học tập không
  const hasStudySession = (year: number, month: number, day: number) => {
    return studySessions.some(
      (session) =>
        session.date.getFullYear() === year && session.date.getMonth() === month && session.date.getDate() === day,
    )
  }

  // Hàm lấy tổng thời gian học tập trong ngày
  const getStudyDuration = (year: number, month: number, day: number) => {
    return studySessions
      .filter(
        (session) =>
          session.date.getFullYear() === year && session.date.getMonth() === month && session.date.getDate() === day,
      )
      .reduce((total, session) => total + session.duration, 0)
  }

  // Tạo lịch
  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const today = new Date()
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year

    const days = []

    // Thêm các ô trống cho các ngày trước ngày đầu tiên của tháng
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Thêm các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && today.getDate() === day
      const hasSession = hasStudySession(year, month, day)
      const duration = hasSession ? getStudyDuration(year, month, day) : 0

      days.push(
        <div
          key={day}
          className={`
            h-12 p-1 border border-gray-200 relative
            ${isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}
          `}
        >
          <div className="absolute top-1 left-1 text-sm">{day}</div>
          {hasSession && (
            <div className="absolute bottom-1 right-1 text-xs font-medium text-green-600 dark:text-green-400">
              {duration} phút
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((day, index) => (
          <div key={index} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>

      <div className="flex items-center justify-end space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-50 dark:bg-blue-900/20 border border-gray-200 mr-1"></div>
          <span>Hôm nay</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-white dark:bg-gray-800 border border-gray-200 mr-1"></div>
          <span>Không có phiên học</span>
        </div>
      </div>
    </div>
  )
}

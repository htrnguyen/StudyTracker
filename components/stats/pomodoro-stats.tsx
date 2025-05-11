"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Clock, Calendar, BarChart2 } from "lucide-react"

export function PomodoroStats() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    averageMinutes: 0,
    longestSession: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      // Giả lập dữ liệu - trong ứng dụng thực tế, bạn sẽ gọi API để lấy dữ liệu
      // Ví dụ: const response = await fetch("/api/stats/pomodoro")

      // Tạo dữ liệu mẫu
      setTimeout(() => {
        setStats({
          totalSessions: 12,
          totalMinutes: 300,
          averageMinutes: 25,
          longestSession: 45,
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lấy thống kê Pomodoro",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng số phiên</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-6 w-16 bg-muted rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalSessions}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng thời gian</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-6 w-16 bg-muted rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.totalMinutes} phút</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Trung bình mỗi phiên</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-6 w-16 bg-muted rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.averageMinutes} phút</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Phiên dài nhất</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse h-6 w-16 bg-muted rounded"></div>
          ) : (
            <div className="text-2xl font-bold">{stats.longestSession} phút</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

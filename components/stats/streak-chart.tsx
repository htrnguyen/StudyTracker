"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

type CheckInData = {
  date: string
  check_in_time: string
}

export function StreakChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Giả lập dữ liệu - trong ứng dụng thực tế, bạn sẽ gọi API để lấy dữ liệu
      // Ví dụ: const response = await fetch("/api/stats/streak")

      // Tạo dữ liệu mẫu cho 7 ngày gần nhất
      const mockData = generateMockData(7)
      setData(mockData)
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lấy dữ liệu thống kê",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockData = (days: number) => {
    const data = []
    const today = new Date()

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      const dateStr = date.toISOString().split("T")[0]
      const dayName = new Intl.DateTimeFormat("vi-VN", { weekday: "short" }).format(date)

      // Random duration between 0-120 minutes (0 means no study that day)
      const duration = Math.floor(Math.random() * 120)

      data.push({
        date: dateStr,
        day: dayName,
        duration: duration,
      })
    }

    return data
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background p-2 border rounded shadow-sm">
          <p className="font-medium">{new Date(data.date).toLocaleDateString("vi-VN")}</p>
          <p className="text-sm">{`Thời gian học: ${data.duration} phút`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="w-full h-[300px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Thời gian học 7 ngày qua</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="duration" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

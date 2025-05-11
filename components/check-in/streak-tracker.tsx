"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, Calendar, Trophy } from "lucide-react"

export function StreakTracker() {
  const [streak, setStreak] = useState(0)
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkedInToday, setCheckedInToday] = useState(false)

  useEffect(() => {
    fetchStreak()
  }, [])

  const fetchStreak = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/streak")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Không thể lấy thông tin streak")
      }

      const data = await response.json()
      setStreak(data.streak)
      setLastCheckIn(data.lastCheckIn)

      // Check if already checked in today
      const today = new Date().toISOString().split("T")[0]
      setCheckedInToday(data.lastCheckIn === today)
    } catch (error) {
      console.error("Error fetching streak:", error)
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể lấy thông tin streak",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckIn = async () => {
    if (isSubmitting || checkedInToday) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      const data = await response.json()

      if (response.ok) {
        setStreak(data.streak)
        setCheckedInToday(true)

        const today = new Date().toISOString().split("T")[0]
        setLastCheckIn(today)

        toast({
          title: "Check-in thành công!",
          description: `Chuỗi ngày học liên tiếp của bạn: ${data.streak} ngày.`,
        })
      } else {
        throw new Error(data.error || "Không thể check-in")
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể check-in",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Chuỗi ngày học liên tiếp</span>
          <Trophy className="h-5 w-5 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-5xl font-bold">{streak}</div>
              <div className="text-sm text-muted-foreground">ngày liên tiếp</div>
            </div>

            {lastCheckIn && (
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Check-in gần nhất: {formatDate(lastCheckIn)}</span>
              </div>
            )}

            <Button onClick={handleCheckIn} className="w-full" disabled={isSubmitting || checkedInToday}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {checkedInToday ? "Đã check-in hôm nay" : isSubmitting ? "Đang check-in..." : "Check-in hôm nay"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

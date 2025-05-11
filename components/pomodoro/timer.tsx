"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, RotateCcw, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [note, setNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const totalDurationRef = useRef<number>(25 * 60)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (time === 0 && isActive) {
      setIsActive(false)
      setIsComplete(true)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      toast({
        title: "Phiên Pomodoro hoàn thành!",
        description: "Bạn đã hoàn thành phiên Pomodoro 25 phút.",
      })
    }
  }, [time, isActive])

  const toggleTimer = () => {
    if (isActive) {
      // Pause timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      setIsActive(false)
    } else {
      // Start timer
      if (isComplete) {
        resetTimer()
      }

      startTimeRef.current = Date.now() - (totalDurationRef.current - time) * 1000

      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current)
            }
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      setIsActive(true)
    }
  }

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTime(25 * 60)
    setIsActive(false)
    setIsComplete(false)
    startTimeRef.current = null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const calculateProgress = () => {
    return ((totalDurationRef.current - time) / totalDurationRef.current) * 100
  }

  const handleSubmit = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      const today = new Date().toISOString().split("T")[0]
      const duration = Math.round((totalDurationRef.current - time) / 60) // Convert to minutes

      const response = await fetch("/api/pomodoro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_date: today,
          duration: duration,
          note: note,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Phiên học đã được lưu",
          description: "Phiên Pomodoro của bạn đã được ghi lại thành công.",
        })
        resetTimer()
        setNote("")
      } else {
        throw new Error(data.error || "Có lỗi xảy ra khi lưu phiên học")
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu phiên học",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-6xl font-bold tabular-nums">{formatTime(time)}</div>

          <Progress value={calculateProgress()} className="w-full h-2" />

          <div className="flex space-x-2">
            <Button onClick={toggleTimer} className="w-24">
              {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isActive ? "Tạm dừng" : "Bắt đầu"}
            </Button>
            <Button onClick={resetTimer} variant="outline" className="w-24">
              <RotateCcw className="mr-2 h-4 w-4" />
              Đặt lại
            </Button>
          </div>

          {isComplete && (
            <div className="w-full space-y-4">
              <Textarea
                placeholder="Ghi chú về phiên học của bạn..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? "Đang lưu..." : "Lưu phiên học"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

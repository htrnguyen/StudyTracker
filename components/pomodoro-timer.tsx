"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Check } from "lucide-react"
import { addPomodoro } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function PomodoroTimer() {
  const [duration, setDuration] = useState(25)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [note, setNote] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (isActive && timeLeft === 0) {
      setIsActive(false)
      setIsCompleted(true)
      // Phát âm thanh thông báo khi kết thúc
      const audio = new Audio("/notification.mp3")
      audio.play()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive, timeLeft])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(duration * 60)
    setIsCompleted(false)
    setNote("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleSaveSession = async () => {
    try {
      await addPomodoro({
        duration,
        note: note || "Phiên Pomodoro",
      })

      toast({
        title: "Đã lưu phiên học",
        description: `Phiên Pomodoro ${duration} phút đã được lưu thành công.`,
      })

      resetTimer()
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu phiên học. Vui lòng thử lại.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đồng hồ Pomodoro</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold tabular-nums mb-4">{formatTime(timeLeft)}</div>

          {!isCompleted ? (
            <div className="flex space-x-2">
              <Button onClick={toggleTimer} variant="outline" size="icon">
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 w-full">
              <textarea
                placeholder="Ghi chú về phiên học này..."
                className="w-full p-2 border rounded-md"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button onClick={handleSaveSession} className="w-full">
                <Check className="h-4 w-4 mr-2" />
                Lưu phiên học
              </Button>
            </div>
          )}
        </div>

        {!isActive && !isCompleted && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Thời gian (phút)</span>
              <span className="text-sm font-medium">{duration}</span>
            </div>
            <Slider
              value={[duration]}
              min={5}
              max={60}
              step={5}
              onValueChange={(value) => setDuration(value[0])}
              disabled={isActive}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 phút</span>
              <span>60 phút</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { CheckCircle2, Circle } from "lucide-react"
import { updateTask } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"
import type { Task } from "@/types"

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isDone, setIsDone] = useState(task.done)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleTaskStatus = async () => {
    if (isUpdating) return

    setIsUpdating(true)
    const newStatus = !isDone

    try {
      await updateTask(task.id, { done: newStatus })
      setIsDone(newStatus)

      toast({
        title: newStatus ? "Công việc đã hoàn thành" : "Công việc chưa hoàn thành",
        description: task.task,
      })
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái công việc",
        variant: "destructive",
      })
      // Revert UI state on error
      setIsDone(task.done)
    } finally {
      setIsUpdating(false)
    }
  }

  // Hàm định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
      <button onClick={toggleTaskStatus} disabled={isUpdating} className="mt-1 disabled:opacity-50">
        {isDone ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5 text-gray-300" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-medium ${isDone ? "line-through text-gray-500" : ""}`}>{task.task}</p>

        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span>{formatDate(task.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

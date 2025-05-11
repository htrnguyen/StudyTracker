"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { PlusCircle } from "lucide-react"

type Task = {
  id: string
  task: string
  category: string
  done: boolean
  created_at: string
}

type MatrixCategory = "important-urgent" | "important-not-urgent" | "not-important-urgent" | "not-important-not-urgent"

const categoryLabels: Record<MatrixCategory, string> = {
  "important-urgent": "Quan trọng & Khẩn cấp",
  "important-not-urgent": "Quan trọng & Không khẩn cấp",
  "not-important-urgent": "Không quan trọng & Khẩn cấp",
  "not-important-not-urgent": "Không quan trọng & Không khẩn cấp",
}

const categoryColors: Record<MatrixCategory, string> = {
  "important-urgent": "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800",
  "important-not-urgent": "bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800",
  "not-important-urgent": "bg-yellow-100 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800",
  "not-important-not-urgent": "bg-green-100 dark:bg-green-950 border-green-300 dark:border-green-800",
}

export function EisenhowerMatrix({ initialTasks = [] }: { initialTasks?: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<MatrixCategory>("important-urgent")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTask = async () => {
    if (!newTask.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: newTask,
          category: selectedCategory,
          done: false,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        const newTaskObj: Task = {
          id: data.id,
          task: newTask,
          category: selectedCategory,
          done: false,
          created_at: new Date().toISOString(),
        }

        setTasks([...tasks, newTaskObj])
        setNewTask("")
        toast({
          title: "Công việc đã được thêm",
          description: "Công việc mới đã được thêm vào ma trận Eisenhower.",
        })
      } else {
        throw new Error(data.error || "Có lỗi xảy ra khi thêm công việc")
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Có lỗi xảy ra khi thêm công việc",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)))
    // Trong một ứng dụng thực tế, bạn sẽ gọi API để cập nhật trạng thái của task
  }

  const getTasksByCategory = (category: MatrixCategory) => {
    return tasks.filter((task) => task.category === category)
  }

  const renderQuadrant = (category: MatrixCategory) => {
    const categoryTasks = getTasksByCategory(category)

    return (
      <Card className={`h-full ${categoryColors[category]}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{categoryLabels[category]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categoryTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">Chưa có công việc nào</p>
          ) : (
            <ul className="space-y-2">
              {categoryTasks.map((task) => (
                <li key={task.id} className="flex items-start space-x-2">
                  <Checkbox id={task.id} checked={task.done} onCheckedChange={() => handleToggleTask(task.id)} />
                  <label
                    htmlFor={task.id}
                    className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.task}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">Thêm công việc mới</h2>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Input
            placeholder="Nhập công việc mới..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1"
          />
          <div className="flex space-x-2">
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as MatrixCategory)}
            >
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Button onClick={handleAddTask} disabled={isSubmitting}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Thêm
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="grid gap-4">
          {renderQuadrant("important-urgent")}
          {renderQuadrant("important-not-urgent")}
        </div>
        <div className="grid gap-4">
          {renderQuadrant("not-important-urgent")}
          {renderQuadrant("not-important-not-urgent")}
        </div>
      </div>
    </div>
  )
}

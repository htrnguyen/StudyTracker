"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addTask } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

export function TaskForm() {
  const [task, setTask] = useState("")
  const [category, setCategory] = useState("urgent_important")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!task.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập nội dung công việc",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await addTask({
        task,
        category: category as any,
      })

      toast({
        title: "Thành công",
        description: "Đã thêm công việc mới",
      })

      // Reset form
      setTask("")
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể thêm công việc. Vui lòng thử lại.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thêm công việc mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task">Nội dung công việc</Label>
            <Input
              id="task"
              placeholder="Nhập nội dung công việc..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Phân loại theo Ma trận Eisenhower</Label>
            <RadioGroup value={category} onValueChange={setCategory} className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="urgent_important" id="urgent_important" />
                <Label htmlFor="urgent_important" className="flex-1 cursor-pointer">
                  <span className="font-medium">Quan trọng & Khẩn cấp</span>
                  <p className="text-xs text-muted-foreground">Cần làm ngay lập tức</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="not_urgent_important" id="not_urgent_important" />
                <Label htmlFor="not_urgent_important" className="flex-1 cursor-pointer">
                  <span className="font-medium">Quan trọng & Không khẩn cấp</span>
                  <p className="text-xs text-muted-foreground">Lên kế hoạch thực hiện</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="urgent_not_important" id="urgent_not_important" />
                <Label htmlFor="urgent_not_important" className="flex-1 cursor-pointer">
                  <span className="font-medium">Không quan trọng & Khẩn cấp</span>
                  <p className="text-xs text-muted-foreground">Ủy thác nếu có thể</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="not_urgent_not_important" id="not_urgent_not_important" />
                <Label htmlFor="not_urgent_not_important" className="flex-1 cursor-pointer">
                  <span className="font-medium">Không quan trọng & Không khẩn cấp</span>
                  <p className="text-xs text-muted-foreground">Hạn chế hoặc loại bỏ</p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Đang thêm..." : "Thêm công việc"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

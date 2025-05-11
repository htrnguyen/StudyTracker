import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

export async function RecentTasks() {
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const tasks = [
    {
      id: 1,
      task: "Hoàn thành bài tập Toán",
      category: "urgent_important",
      done: false,
      created_at: "2023-08-14T10:00:00Z",
    },
    {
      id: 2,
      task: "Đọc sách Văn học",
      category: "not_urgent_important",
      done: true,
      created_at: "2023-08-13T14:30:00Z",
    },
    {
      id: 3,
      task: "Ôn tập Tiếng Anh",
      category: "urgent_important",
      done: false,
      created_at: "2023-08-12T09:15:00Z",
    },
    {
      id: 4,
      task: "Nghiên cứu đề tài Khoa học",
      category: "not_urgent_important",
      done: false,
      created_at: "2023-08-11T16:45:00Z",
    },
    {
      id: 5,
      task: "Luyện tập thể dục",
      category: "not_urgent_not_important",
      done: true,
      created_at: "2023-08-10T08:00:00Z",
    },
  ]

  // Hàm chuyển đổi category sang tiếng Việt
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "urgent_important":
        return { label: "Quan trọng & Khẩn cấp", icon: AlertTriangle, color: "text-red-500" }
      case "not_urgent_important":
        return { label: "Quan trọng & Không khẩn cấp", icon: Clock, color: "text-blue-500" }
      case "urgent_not_important":
        return { label: "Không quan trọng & Khẩn cấp", icon: Clock, color: "text-yellow-500" }
      case "not_urgent_not_important":
        return { label: "Không quan trọng & Không khẩn cấp", icon: Clock, color: "text-green-500" }
      default:
        return { label: "Khác", icon: Clock, color: "text-gray-500" }
    }
  }

  // Hàm định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Công việc gần đây</CardTitle>
        <Link href="/tasks">
          <Button variant="ghost" size="sm" className="gap-1">
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const category = getCategoryLabel(task.category)

            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="mt-1">
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.done ? "line-through text-gray-500" : ""}`}>{task.task}</p>

                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <category.icon className={`h-3 w-3 ${category.color}`} />
                    <span className="text-muted-foreground">{category.label}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{formatDate(task.created_at)}</span>
                  </div>
                </div>
              </div>
            )
          })}

          {tasks.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Không có công việc nào. Hãy thêm công việc mới!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

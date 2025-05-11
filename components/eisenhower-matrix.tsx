import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskItem } from "@/components/task-item"

export async function EisenhowerMatrix() {
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
    {
      id: 6,
      task: "Trả lời email",
      category: "urgent_not_important",
      done: false,
      created_at: "2023-08-09T11:20:00Z",
    },
    {
      id: 7,
      task: "Họp nhóm học tập",
      category: "urgent_not_important",
      done: true,
      created_at: "2023-08-08T15:00:00Z",
    },
  ]

  // Phân loại công việc theo ma trận Eisenhower
  const urgentImportant = tasks.filter((task) => task.category === "urgent_important")
  const notUrgentImportant = tasks.filter((task) => task.category === "not_urgent_important")
  const urgentNotImportant = tasks.filter((task) => task.category === "urgent_not_important")
  const notUrgentNotImportant = tasks.filter((task) => task.category === "not_urgent_not_important")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="border-red-200">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="text-red-700 dark:text-red-300">Quan trọng & Khẩn cấp</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {urgentImportant.length > 0 ? (
              urgentImportant.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-center py-4 text-muted-foreground">Không có công việc nào</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="text-blue-700 dark:text-blue-300">Quan trọng & Không khẩn cấp</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {notUrgentImportant.length > 0 ? (
              notUrgentImportant.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-center py-4 text-muted-foreground">Không có công việc nào</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardTitle className="text-yellow-700 dark:text-yellow-300">Không quan trọng & Khẩn cấp</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {urgentNotImportant.length > 0 ? (
              urgentNotImportant.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-center py-4 text-muted-foreground">Không có công việc nào</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="text-green-700 dark:text-green-300">Không quan trọng & Không khẩn cấp</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {notUrgentNotImportant.length > 0 ? (
              notUrgentNotImportant.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
              <p className="text-center py-4 text-muted-foreground">Không có công việc nào</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

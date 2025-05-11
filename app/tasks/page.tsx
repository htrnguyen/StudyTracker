import { Suspense } from "react"
import { EisenhowerMatrix } from "@/components/eisenhower-matrix"
import { TaskForm } from "@/components/task-form"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quản lý Công việc</h1>
          <p className="text-muted-foreground">Sử dụng Ma trận Eisenhower để sắp xếp và quản lý công việc hiệu quả</p>
        </div>
      </div>

      <TaskForm />

      <Suspense fallback={<LoadingSpinner />}>
        <EisenhowerMatrix />
      </Suspense>
    </div>
  )
}

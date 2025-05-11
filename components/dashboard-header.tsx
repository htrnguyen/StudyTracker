import { Button } from "@/components/ui/button"
import { PlusCircle, Bell } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Xin chào, Học viên!</h1>
        <p className="text-muted-foreground">
          Hôm nay là{" "}
          {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Thông báo
        </Button>
        <Button size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm công việc
        </Button>
      </div>
    </div>
  )
}

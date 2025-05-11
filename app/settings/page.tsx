import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt và tùy chọn cho ứng dụng</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
            <CardDescription>Quản lý cách bạn nhận thông báo và nhắc nhở</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Thông báo trên trình duyệt</Label>
                <p className="text-sm text-muted-foreground">Nhận thông báo khi phiên Pomodoro kết thúc</p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reminders">Nhắc nhở qua Google Calendar</Label>
                <p className="text-sm text-muted-foreground">Tự động tạo sự kiện nhắc nhở khi quên check-in</p>
              </div>
              <Switch id="reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pomodoro</CardTitle>
            <CardDescription>Tùy chỉnh cài đặt cho phương pháp Pomodoro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pomodoro-duration">Thời gian làm việc (phút)</Label>
                <Input id="pomodoro-duration" type="number" defaultValue="25" min="1" max="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="short-break">Nghỉ ngắn (phút)</Label>
                <Input id="short-break" type="number" defaultValue="5" min="1" max="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-break">Nghỉ dài (phút)</Label>
                <Input id="long-break" type="number" defaultValue="15" min="5" max="60" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-start">Tự động bắt đầu</Label>
                <p className="text-sm text-muted-foreground">Tự động bắt đầu phiên tiếp theo sau khi nghỉ</p>
              </div>
              <Switch id="auto-start" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tài khoản</CardTitle>
            <CardDescription>Quản lý thông tin tài khoản và dữ liệu của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>

            <div className="flex flex-col space-y-2">
              <Button variant="outline">Đổi mật khẩu</Button>
              <Button variant="outline" className="text-red-500 hover:text-red-600">
                Xóa tất cả dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

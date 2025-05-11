import { ReminderForm } from "@/components/reminders/reminder-form"

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Nhắc nhở Học tập</h1>
      <p className="text-muted-foreground">Tạo nhắc nhở học tập để đảm bảo bạn không bỏ lỡ các phiên học quan trọng.</p>

      <div className="max-w-md mx-auto">
        <ReminderForm />
      </div>

      <div className="max-w-md mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Về tính năng nhắc nhở</h2>
        <p>Các nhắc nhở sẽ được tạo trong Google Calendar của bạn, giúp bạn:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Nhận thông báo trước các phiên học đã lên lịch</li>
          <li>Tự động nhắc nhở nếu bạn quên check-in ngày hôm trước</li>
          <li>Đồng bộ lịch học với các thiết bị khác nhau</li>
          <li>Quản lý thời gian học tập hiệu quả hơn</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">
          Lưu ý: Hệ thống cũng tự động tạo nhắc nhở vào 7 giờ sáng nếu bạn quên check-in ngày hôm trước.
        </p>
      </div>
    </div>
  )
}

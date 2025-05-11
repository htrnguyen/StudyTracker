import { PomodoroTimer } from "@/components/pomodoro/timer"

export default function PomodoroPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pomodoro Timer</h1>
      <p className="text-muted-foreground">
        Sử dụng kỹ thuật Pomodoro để tập trung học tập. Mỗi phiên kéo dài 25 phút, sau đó bạn có thể nghỉ ngơi.
      </p>

      <div className="max-w-md mx-auto">
        <PomodoroTimer />
      </div>

      <div className="max-w-md mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Hướng dẫn sử dụng</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Nhấn <strong>Bắt đầu</strong> để khởi động bộ đếm thời gian 25 phút.
          </li>
          <li>Tập trung vào việc học tập trong suốt thời gian này.</li>
          <li>Khi thời gian kết thúc, bạn sẽ được nhắc nhở để ghi lại phiên học.</li>
          <li>Thêm ghi chú về những gì bạn đã học được trong phiên này.</li>
          <li>
            Nhấn <strong>Lưu phiên học</strong> để ghi lại kết quả.
          </li>
        </ul>
      </div>
    </div>
  )
}

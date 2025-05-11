import { StreakTracker } from "@/components/check-in/streak-tracker"

export default function CheckInPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Check-in Hàng ngày</h1>
      <p className="text-muted-foreground">
        Duy trì thói quen học tập bằng cách check-in mỗi ngày để theo dõi chuỗi ngày học liên tiếp của bạn.
      </p>

      <div className="max-w-md mx-auto">
        <StreakTracker />
      </div>

      <div className="max-w-md mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Lợi ích của việc duy trì streak</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Tạo động lực học tập đều đặn mỗi ngày</li>
          <li>Xây dựng thói quen học tập bền vững</li>
          <li>Theo dõi tiến độ học tập dài hạn</li>
          <li>Tăng cường kỷ luật tự giác</li>
          <li>Cải thiện hiệu quả học tập thông qua sự nhất quán</li>
        </ul>
      </div>
    </div>
  )
}

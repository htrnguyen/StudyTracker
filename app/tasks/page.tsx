import { EisenhowerMatrix } from "@/components/tasks/eisenhower-matrix"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quản lý Công việc</h1>
      <p className="text-muted-foreground">
        Sử dụng Ma trận Eisenhower để phân loại và quản lý các công việc của bạn theo mức độ quan trọng và khẩn cấp.
      </p>

      <EisenhowerMatrix />

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Giới thiệu về Ma trận Eisenhower</h2>
        <p>
          Ma trận Eisenhower là một công cụ quản lý thời gian giúp bạn phân loại công việc dựa trên hai tiêu chí: mức độ
          quan trọng và tính khẩn cấp.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Quan trọng & Khẩn cấp</h3>
            <p className="text-sm text-muted-foreground">
              Những công việc cần được giải quyết ngay lập tức. Ví dụ: deadline sắp đến, khủng hoảng.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Quan trọng & Không khẩn cấp</h3>
            <p className="text-sm text-muted-foreground">
              Những công việc cần lập kế hoạch. Ví dụ: rèn luyện kỹ năng, phát triển cá nhân.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Không quan trọng & Khẩn cấp</h3>
            <p className="text-sm text-muted-foreground">
              Những công việc nên ủy quyền nếu có thể. Ví dụ: một số cuộc họp, email.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Không quan trọng & Không khẩn cấp</h3>
            <p className="text-sm text-muted-foreground">
              Những công việc nên hạn chế. Ví dụ: lướt mạng xã hội, xem TV.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

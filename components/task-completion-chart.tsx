"use client"

import { useEffect, useRef } from "react"

export function TaskCompletionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Dữ liệu giả về hoàn thành công việc theo loại
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const taskData = [
    { category: "Quan trọng & Khẩn cấp", completed: 8, total: 12, color: "#ef4444" },
    { category: "Quan trọng & Không khẩn cấp", completed: 6, total: 10, color: "#3b82f6" },
    { category: "Không quan trọng & Khẩn cấp", completed: 4, total: 6, color: "#eab308" },
    { category: "Không quan trọng & Không khẩn cấp", completed: 3, total: 5, color: "#22c55e" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Đặt kích thước canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    // Đặt lại kích thước CSS
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Cấu hình biểu đồ
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Tính tổng số công việc
    const totalTasks = taskData.reduce((sum, data) => sum + data.total, 0)

    // Vẽ biểu đồ tròn
    let startAngle = 0

    taskData.forEach((data) => {
      const sliceAngle = (data.total / totalTasks) * 2 * Math.PI
      const completedAngle = (data.completed / data.total) * sliceAngle

      // Vẽ phần hoàn thành
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + completedAngle)
      ctx.fillStyle = data.color
      ctx.fill()

      // Vẽ phần chưa hoàn thành
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle + completedAngle, startAngle + sliceAngle)
      ctx.fillStyle = `${data.color}40` // Thêm độ trong suốt
      ctx.fill()

      startAngle += sliceAngle
    })

    // Vẽ hình tròn trắng ở giữa
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Vẽ chú thích
    const legendY = rect.height - 20
    const legendSpacing = rect.width / (taskData.length + 1)

    taskData.forEach((data, i) => {
      const x = (i + 1) * legendSpacing

      // Vẽ ô màu
      ctx.fillStyle = data.color
      ctx.fillRect(x - 30, legendY, 10, 10)

      // Vẽ văn bản
      ctx.fillStyle = "#64748b"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${data.completed}/${data.total}`, x - 15, legendY + 5)
    })

    // Vẽ tỷ lệ hoàn thành ở giữa
    const completedTasks = taskData.reduce((sum, data) => sum + data.completed, 0)
    const completionRate = Math.round((completedTasks / totalTasks) * 100)

    ctx.fillStyle = "#0f172a"
    ctx.font = "bold 24px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${completionRate}%`, centerX, centerY - 10)

    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"
    ctx.fillText("Hoàn thành", centerX, centerY + 15)
  }, [])

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

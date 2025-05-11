"use client"

import { useEffect, useRef } from "react"

export function StudyTimeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Dữ liệu giả về thời gian học tập theo ngày
  // Trong thực tế, dữ liệu này sẽ được lấy từ API
  const studyData = [
    { date: "01/08", minutes: 45 },
    { date: "02/08", minutes: 30 },
    { date: "03/08", minutes: 60 },
    { date: "04/08", minutes: 25 },
    { date: "05/08", minutes: 0 },
    { date: "06/08", minutes: 0 },
    { date: "07/08", minutes: 75 },
    { date: "08/08", minutes: 50 },
    { date: "09/08", minutes: 40 },
    { date: "10/08", minutes: 30 },
    { date: "11/08", minutes: 45 },
    { date: "12/08", minutes: 60 },
    { date: "13/08", minutes: 20 },
    { date: "14/08", minutes: 55 },
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
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Tìm giá trị lớn nhất
    const maxValue = Math.max(...studyData.map((d) => d.minutes))

    // Vẽ trục y
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.stroke()

    // Vẽ trục x
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding.left, padding.top + chartHeight)
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.stroke()

    // Vẽ các đường kẻ ngang
    const ySteps = 5
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "#64748b"

    for (let i = 0; i <= ySteps; i++) {
      const y = padding.top + chartHeight - (i / ySteps) * chartHeight
      const value = Math.round((i / ySteps) * maxValue)

      ctx.beginPath()
      ctx.strokeStyle = "#e2e8f0"
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      ctx.fillText(`${value}`, padding.left - 5, y)
    }

    // Vẽ các nhãn trục x
    const barWidth = chartWidth / studyData.length
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    studyData.forEach((data, i) => {
      const x = padding.left + i * barWidth + barWidth / 2
      ctx.fillText(data.date, x, padding.top + chartHeight + 5)
    })

    // Vẽ các cột
    studyData.forEach((data, i) => {
      const x = padding.left + i * barWidth
      const barHeight = (data.minutes / maxValue) * chartHeight
      const y = padding.top + chartHeight - barHeight

      // Vẽ cột
      ctx.fillStyle = data.minutes > 0 ? "#3b82f6" : "#e2e8f0"
      ctx.fillRect(x + 4, y, barWidth - 8, barHeight)
    })

    // Thêm tiêu đề trục y
    ctx.save()
    ctx.translate(10, padding.top + chartHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"
    ctx.fillText("Phút", 0, 0)
    ctx.restore()
  }, [])

  return (
    <div className="w-full h-64">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  )
}

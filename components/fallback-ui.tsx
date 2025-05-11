"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function ApiFallback() {
  const [isChecking, setIsChecking] = useState(false)
  const [status, setStatus] = useState<"idle" | "checking" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const checkApiConnection = async () => {
    setIsChecking(true)
    setStatus("checking")

    try {
      const response = await fetch("/api/streak")

      if (response.ok) {
        setStatus("success")
        setMessage("Kết nối API thành công!")
      } else {
        const data = await response.json()
        setStatus("error")
        setMessage(`Lỗi: ${data.error || "Không thể kết nối đến API"}`)
      }
    } catch (error) {
      setStatus("error")
      setMessage(`Lỗi: ${error instanceof Error ? error.message : "Không thể kết nối đến API"}`)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-amber-500">
          <AlertTriangle className="mr-2 h-5 w-5" />
          Kiểm tra kết nối API
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Có vẻ như hệ thống đang gặp vấn đề khi kết nối đến Google Apps Script. Hãy kiểm tra:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>URL của Google Apps Script đã được cấu hình đúng trong biến môi trường</li>
          <li>Google Apps Script đã được triển khai dưới dạng web app và có thể truy cập công khai</li>
          <li>Không có vấn đề về CORS hoặc quyền truy cập</li>
        </ul>

        <div className="pt-2">
          <Button onClick={checkApiConnection} disabled={isChecking} className="w-full">
            {isChecking ? "Đang kiểm tra..." : "Kiểm tra kết nối API"}
          </Button>
        </div>

        {status !== "idle" && (
          <div
            className={`mt-4 p-3 rounded-md ${
              status === "checking"
                ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                : status === "success"
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Kiểm tra nếu request đến từ Postman hoặc curl
  const userAgent = request.headers.get("user-agent") || ""
  const isAutomatedTool = userAgent.includes("Postman") || userAgent.includes("curl")

  // Nếu là API request, cho phép truy cập
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Nếu là request từ trình duyệt đến trang chủ, cho phép truy cập
  if (request.nextUrl.pathname === "/") {
    return NextResponse.next()
  }

  // Chuyển hướng các request khác về trang chủ
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

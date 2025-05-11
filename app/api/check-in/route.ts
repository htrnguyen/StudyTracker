import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    let body = {}

    // Only try to parse body if there is content
    if (request.body) {
      try {
        body = await request.json()
      } catch (e) {
        // If body parsing fails, use empty object
        body = {}
      }
    }

    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=checkIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || "Failed to check in",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking in:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

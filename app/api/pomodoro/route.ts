import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.duration) {
      return NextResponse.json(
        {
          success: false,
          error: "Duration is required for a Pomodoro session",
        },
        { status: 400 },
      )
    }

    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=addPomodoro`, {
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
          error: data.error || "Failed to add Pomodoro session",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding Pomodoro session:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=getPomodoroLogs`)

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || "Failed to get Pomodoro logs",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting Pomodoro logs:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

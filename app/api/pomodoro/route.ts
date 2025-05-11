import { NextResponse } from "next/server"

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.duration || !body.session_date) {
      return NextResponse.json(
        { error: "Missing required fields: duration and session_date are required" },
        { status: 400 },
      )
    }

    // Format the request for Google Apps Script
    const payload = {
      action: "addPomodoro",
      data: {
        session_date: body.session_date,
        duration: body.duration,
        note: body.note || "",
      },
    }

    // Call Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error || "Failed to add pomodoro session" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding pomodoro session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.start_time) {
      return NextResponse.json({ error: "Missing required fields: title and start_time are required" }, { status: 400 })
    }

    // Format the request for Google Apps Script
    const payload = {
      action: "createReminder",
      data: {
        title: body.title,
        description: body.description || "",
        start_time: body.start_time,
        end_time: body.end_time || new Date(new Date(body.start_time).getTime() + 30 * 60000).toISOString(),
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
      return NextResponse.json({ error: data.error || "Failed to create reminder" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

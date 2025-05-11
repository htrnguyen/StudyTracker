import { NextResponse } from "next/server"

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.task || !body.category) {
      return NextResponse.json({ error: "Missing required fields: task and category are required" }, { status: 400 })
    }

    // Format the request for Google Apps Script
    const payload = {
      action: "addTask",
      data: {
        task: body.task,
        category: body.category,
        done: body.done || false,
        created_at: new Date().toISOString(),
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
      return NextResponse.json({ error: data.error || "Failed to add task" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

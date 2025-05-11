import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task description is required",
        },
        { status: 400 },
      )
    }

    if (!body.category) {
      return NextResponse.json(
        {
          success: false,
          error: "Category is required for task prioritization",
        },
        { status: 400 },
      )
    }

    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=addTask`, {
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
          error: data.error || "Failed to add task",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding task:", error)
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
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=getTasks`)

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || "Failed to get tasks",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting tasks:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

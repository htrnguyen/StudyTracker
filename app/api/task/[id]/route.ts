import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Add the ID to the request body
    body.id = id

    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=updateTask`, {
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
          error: data.error || "Failed to update task",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

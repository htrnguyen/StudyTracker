import { NextResponse } from "next/server"

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: Request) {
  try {
    if (!APPS_SCRIPT_URL) {
      console.error("GOOGLE_APPS_SCRIPT_URL is not defined")
      return NextResponse.json({ error: "API URL not configured" }, { status: 500 })
    }

    const body = await request.json()

    // Format the request for Google Apps Script
    const payload = {
      action: "checkIn",
      data: {
        date: body.date || new Date().toISOString().split("T")[0],
        check_in_time: new Date().toISOString(),
      },
    }

    console.log("Calling Google Apps Script with payload:", JSON.stringify(payload))

    // Call Google Apps Script
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    // Check if response is OK before parsing JSON
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Error response from Apps Script:", errorText)
      return NextResponse.json(
        {
          error: "Failed to check in",
          details: errorText.substring(0, 200) + "...",
        },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking in:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

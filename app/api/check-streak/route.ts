import { NextResponse } from "next/server"

// This endpoint will be called by a cron job to check for missed check-ins
export async function GET() {
  try {
    // Call Google Apps Script endpoint
    const response = await fetch(`${process.env.GOOGLE_APPS_SCRIPT_URL}?action=checkMissedCheckIns`)

    const data = await response.json()

    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || "Failed to check missed check-ins",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking missed check-ins:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

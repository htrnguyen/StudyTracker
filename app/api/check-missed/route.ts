import { NextResponse } from "next/server"

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function GET() {
  try {
    // Format the request for Google Apps Script
    const payload = {
      action: "checkMissedCheckIn",
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
      return NextResponse.json({ error: data.error || "Failed to check missed check-ins" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking missed check-ins:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

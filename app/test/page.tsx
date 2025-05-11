"use client"

import { useState } from "react"
import {
  addPomodoro,
  getPomodoroLogs,
  addTask,
  updateTask,
  getTasks,
  checkIn,
  getStreak,
  createReminder,
} from "@/lib/api"

export default function TestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState("getPomodoroLogs")

  const testApi = async () => {
    setLoading(true)
    try {
      let response

      switch (action) {
        case "getPomodoroLogs":
          response = await getPomodoroLogs()
          break
        case "addPomodoro":
          response = await addPomodoro({
            duration: 25,
            note: "Test pomodoro session",
          })
          break
        case "getTasks":
          response = await getTasks()
          break
        case "addTask":
          response = await addTask({
            task: "Test task",
            category: "urgent_important",
          })
          break
        case "updateTask":
          // Assuming task with ID 1 exists
          response = await updateTask(1, {
            done: true,
          })
          break
        case "checkIn":
          response = await checkIn()
          break
        case "getStreak":
          response = await getStreak()
          break
        case "createReminder":
          response = await createReminder({
            title: "Test reminder",
            description: "This is a test reminder",
          })
          break
        default:
          response = { success: false, error: "Unknown action" }
      }

      setResult(response)
    } catch (error) {
      console.error("Error testing API:", error)
      setResult({ success: false, error: "Failed to test API" })
    } finally {
      setLoading(false)
    }
  }

  const handleDirectTest = async () => {
    setLoading(true)
    try {
      let url = `${process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL}?action=`
      let method = "GET"
      let body: any = undefined

      switch (action) {
        case "getPomodoroLogs":
          url += "getPomodoroLogs"
          break
        case "addPomodoro":
          url += "addPomodoro"
          method = "POST"
          body = {
            duration: 25,
            note: "Test pomodoro session",
          }
          break
        case "getTasks":
          url += "getTasks"
          break
        case "addTask":
          url += "addTask"
          method = "POST"
          body = {
            task: "Test task",
            category: "urgent_important",
          }
          break
        case "updateTask":
          url += "updateTask"
          method = "POST"
          body = {
            id: 1,
            done: true,
          }
          break
        case "checkIn":
          url += "checkIn"
          method = "POST"
          body = {}
          break
        case "getStreak":
          url += "getStreak"
          break
        case "createReminder":
          url += "createReminder"
          method = "POST"
          body = {
            title: "Test reminder",
            description: "This is a test reminder",
          }
          break
        default:
          setResult({ success: false, error: "Unknown action" })
          setLoading(false)
          return
      }

      const response = await fetch(url, {
        method,
        headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error testing API directly:", error)
      setResult({ success: false, error: "Failed to test API directly" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Study Time Tracker API Test</h1>

      <div className="mb-4">
        <label htmlFor="action" className="block mb-2 font-medium">
          Select API Action:
        </label>
        <select
          id="action"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="getPomodoroLogs">Get Pomodoro Logs</option>
          <option value="addPomodoro">Add Pomodoro</option>
          <option value="getTasks">Get Tasks</option>
          <option value="addTask">Add Task</option>
          <option value="updateTask">Update Task</option>
          <option value="checkIn">Check In</option>
          <option value="getStreak">Get Streak</option>
          <option value="createReminder">Create Reminder</option>
        </select>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={testApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test via Next.js API"}
        </button>

        <button
          onClick={handleDirectTest}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Google Apps Script Directly"}
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">API Documentation</h2>

        <div className="space-y-6">
          <div className="border rounded p-4">
            <h3 className="font-bold">POST /api/pomodoro</h3>
            <p className="text-sm text-gray-600 mb-2">Records a new Pomodoro study session</p>
            <pre className="bg-gray-100 p-2 text-sm">
              {`{
  "duration": 25,          // Required: Duration in minutes
  "session_date": "2023-08-15", // Optional: Date in YYYY-MM-DD format (defaults to today)
  "note": "Study notes",   // Optional: Notes about the session
  "createReminder": true   // Optional: Create a reminder for the next session
}`}
            </pre>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-bold">POST /api/task</h3>
            <p className="text-sm text-gray-600 mb-2">Adds a new task to the Eisenhower Matrix</p>
            <pre className="bg-gray-100 p-2 text-sm">
              {`{
  "task": "Complete project",        // Required: Task description
  "category": "urgent_important",    // Required: One of urgent_important, not_urgent_important, 
                                    //           urgent_not_important, not_urgent_not_important
  "done": false,                    // Optional: Task completion status (defaults to false)
  "created_at": "2023-08-15T10:00:00Z" // Optional: Creation datetime (defaults to now)
}`}
            </pre>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-bold">POST /api/check-in</h3>
            <p className="text-sm text-gray-600 mb-2">Marks the completion of daily study</p>
            <pre className="bg-gray-100 p-2 text-sm">
              {`{
  "date": "2023-08-15",            // Optional: Date in YYYY-MM-DD format (defaults to today)
  "check_in_time": "2023-08-15T18:30:00Z" // Optional: Check-in time (defaults to now)
}`}
            </pre>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-bold">POST /api/remind</h3>
            <p className="text-sm text-gray-600 mb-2">Creates a manual Calendar reminder</p>
            <pre className="bg-gray-100 p-2 text-sm">
              {`{
  "title": "Study Reminder",       // Optional: Event title (defaults to "Study Reminder")
  "description": "Time to study!", // Optional: Event description
  "startTime": "2023-08-16T09:00:00Z", // Optional: Start time (defaults to now)
  "endTime": "2023-08-16T09:30:00Z"    // Optional: End time (defaults to start + 30 minutes)
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

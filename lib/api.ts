// Helper functions for API calls

import type { ApiResponse, Pomodoro, Task, CheckIn, Streak, Reminder } from "@/types"

// Pomodoro API functions
export async function addPomodoro(data: {
  duration: number
  session_date?: string
  note?: string
  createReminder?: boolean
}): Promise<ApiResponse<Pomodoro>> {
  const response = await fetch("/api/pomodoro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function getPomodoroLogs(): Promise<ApiResponse<Pomodoro[]>> {
  const response = await fetch("/api/pomodoro")
  return response.json()
}

// Task API functions
export async function addTask(data: {
  task: string
  category: "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important"
  done?: boolean
  created_at?: string
}): Promise<ApiResponse<Task>> {
  const response = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function updateTask(
  id: number,
  data: {
    task?: string
    category?: "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important"
    done?: boolean
  },
): Promise<ApiResponse<Task>> {
  const response = await fetch(`/api/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function getTasks(): Promise<ApiResponse<Task[]>> {
  const response = await fetch("/api/task")
  return response.json()
}

// Check-in API functions
export async function checkIn(
  data: {
    date?: string
    check_in_time?: string
  } = {},
): Promise<ApiResponse<CheckIn & { current_streak: number }>> {
  const response = await fetch("/api/check-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function getStreak(): Promise<ApiResponse<Streak>> {
  const response = await fetch("/api/streak")
  return response.json()
}

// Reminder API functions
export async function createReminder(data: {
  title?: string
  description?: string
  startTime?: string
  endTime?: string
}): Promise<ApiResponse<Reminder>> {
  const response = await fetch("/api/remind", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return response.json()
}

export async function checkMissedCheckIns(): Promise<ApiResponse<any>> {
  const response = await fetch("/api/check-streak")
  return response.json()
}

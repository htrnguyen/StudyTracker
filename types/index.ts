// Type definitions for the Study Time Tracker

export interface Pomodoro {
  id: number
  session_date: string
  duration: number
  note?: string
}

export interface Task {
  id: number
  task: string
  category: "urgent_important" | "not_urgent_important" | "urgent_not_important" | "not_urgent_not_important"
  done: boolean
  created_at: string
}

export interface CheckIn {
  date: string
  check_in_time: string
}

export interface Streak {
  current_streak: number
}

export interface Reminder {
  id: string
  title: string
  description: string
  start_time: string
  end_time: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  error?: string
  data?: T
}

// Google Apps Script code for Study Time Tracker
// Sheet ID: 1evWM9IQ8JOf3mpH0-1QVYgoj1xGu4iZCFxmw2xuIpAo

// Constants for sheets and configuration
const SPREADSHEET_ID = "1evWM9IQ8JOf3mpH0-1QVYgoj1xGu4iZCFxmw2xuIpAo"
const SHEETS = {
  POMODORO: "PomodoroLogs",
  TASKS: "EisenhowerTasks",
  STREAK: "DailyStreak",
}

// Main entry points for the Web App
function doGet(e) {
  return handleRequest(e)
}

function doPost(e) {
  return handleRequest(e)
}

// Central request handler for all API endpoints
function handleRequest(e) {
  // Set up CORS headers for the response
  const output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)

  try {
    // Get the action from the request parameters
    const action = e.parameter.action

    // Check if action is specified
    if (!action) {
      return output.setContent(
        JSON.stringify({
          success: false,
          error: "No action specified. Please include an 'action' parameter.",
        }),
      )
    }

    // Route the request to the appropriate handler
    let result
    switch (action) {
      case "addPomodoro":
        result = addPomodoro(e)
        break
      case "getPomodoroLogs":
        result = getPomodoroLogs()
        break
      case "addTask":
        result = addTask(e)
        break
      case "getTasks":
        result = getTasks()
        break
      case "updateTask":
        result = updateTask(e)
        break
      case "checkIn":
        result = checkIn(e)
        break
      case "getStreak":
        result = getStreak()
        break
      case "createReminder":
        result = createReminder(e)
        break
      case "checkMissedCheckIns":
        result = checkMissedCheckIns()
        break
      default:
        result = {
          success: false,
          error: `Unknown action: ${action}`,
        }
    }

    return output.setContent(JSON.stringify(result))
  } catch (error) {
    // Handle any unexpected errors
    return output.setContent(
      JSON.stringify({
        success: false,
        error: `An error occurred: ${error.toString()}`,
      }),
    )
  }
}

// Function to add a new Pomodoro session
function addPomodoro(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.POMODORO)

    // Parse the request data
    const requestData = JSON.parse(e.postData.contents)

    // Validate required fields
    if (!requestData.duration) {
      return {
        success: false,
        error: "Duration is required for a Pomodoro session.",
      }
    }

    // Set default values if not provided
    const sessionDate = requestData.session_date || new Date().toISOString().split("T")[0]
    const note = requestData.note || ""

    // Check if there's already an entry for this date
    const data = sheet.getDataRange().getValues()
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === sessionDate) {
        return {
          success: false,
          error: `A Pomodoro session already exists for ${sessionDate}.`,
        }
      }
    }

    // Generate a unique ID
    const id = generateUniqueId(sheet, 0)

    // Add new row to the sheet
    sheet.appendRow([id, sessionDate, requestData.duration, note])

    // Create a reminder for the next session if requested
    if (requestData.createReminder) {
      createPomodoroReminder()
    }

    return {
      success: true,
      data: {
        id: id,
        session_date: sessionDate,
        duration: requestData.duration,
        note: note,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to add Pomodoro session: ${error.toString()}`,
    }
  }
}

// Function to get all Pomodoro logs
function getPomodoroLogs() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.POMODORO)
    const data = sheet.getDataRange().getValues()

    // Check if there's any data
    if (data.length <= 1) {
      return {
        success: true,
        data: [],
      }
    }

    // Convert sheet data to objects
    const headers = data[0]
    const logs = data.slice(1).map((row) => {
      const log = {}
      headers.forEach((header, index) => {
        log[header] = row[index]
      })
      return log
    })

    return {
      success: true,
      data: logs,
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to retrieve Pomodoro logs: ${error.toString()}`,
    }
  }
}

// Function to add a new task
function addTask(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.TASKS)

    // Parse the request data
    const requestData = JSON.parse(e.postData.contents)

    // Validate required fields
    if (!requestData.task) {
      return {
        success: false,
        error: "Task description is required.",
      }
    }

    if (!requestData.category) {
      return {
        success: false,
        error: "Category is required for task prioritization.",
      }
    }

    // Validate category
    const validCategories = [
      "urgent_important",
      "not_urgent_important",
      "urgent_not_important",
      "not_urgent_not_important",
    ]

    if (!validCategories.includes(requestData.category)) {
      return {
        success: false,
        error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
      }
    }

    // Set default values if not provided
    const done = requestData.done === undefined ? false : Boolean(requestData.done)
    const createdAt = requestData.created_at || new Date().toISOString()

    // Generate a unique ID
    const id = generateUniqueId(sheet, 0)

    // Add new row to the sheet
    sheet.appendRow([id, requestData.task, requestData.category, done, createdAt])

    return {
      success: true,
      data: {
        id: id,
        task: requestData.task,
        category: requestData.category,
        done: done,
        created_at: createdAt,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to add task: ${error.toString()}`,
    }
  }
}

// Function to update an existing task
function updateTask(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.TASKS)

    // Parse the request data
    const requestData = JSON.parse(e.postData.contents)

    // Validate required fields
    if (!requestData.id) {
      return {
        success: false,
        error: "Task ID is required for updates.",
      }
    }

    // Find the task by ID
    const data = sheet.getDataRange().getValues()
    let rowIndex = -1

    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == requestData.id) {
        rowIndex = i + 1 // +1 because sheet rows are 1-indexed
        break
      }
    }

    if (rowIndex === -1) {
      return {
        success: false,
        error: `No task found with ID: ${requestData.id}`,
      }
    }

    // Update the task properties
    const updatedTask = {}

    // Task description
    if (requestData.task !== undefined) {
      sheet.getRange(rowIndex, 2).setValue(requestData.task)
      updatedTask.task = requestData.task
    } else {
      updatedTask.task = data[rowIndex - 1][1]
    }

    // Category
    if (requestData.category !== undefined) {
      // Validate category
      const validCategories = [
        "urgent_important",
        "not_urgent_important",
        "urgent_not_important",
        "not_urgent_not_important",
      ]

      if (!validCategories.includes(requestData.category)) {
        return {
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(", ")}`,
        }
      }

      sheet.getRange(rowIndex, 3).setValue(requestData.category)
      updatedTask.category = requestData.category
    } else {
      updatedTask.category = data[rowIndex - 1][2]
    }

    // Done status
    if (requestData.done !== undefined) {
      const done = Boolean(requestData.done)
      sheet.getRange(rowIndex, 4).setValue(done)
      updatedTask.done = done
    } else {
      updatedTask.done = data[rowIndex - 1][3]
    }

    // Created at (generally shouldn't be updated)
    updatedTask.created_at = data[rowIndex - 1][4]

    // Add the ID to the response
    updatedTask.id = requestData.id

    return {
      success: true,
      data: updatedTask,
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to update task: ${error.toString()}`,
    }
  }
}

// Function to get all tasks
function getTasks() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.TASKS)
    const data = sheet.getDataRange().getValues()

    // Check if there's any data
    if (data.length <= 1) {
      return {
        success: true,
        data: [],
      }
    }

    // Convert sheet data to objects
    const headers = data[0]
    const tasks = data.slice(1).map((row) => {
      const task = {}
      headers.forEach((header, index) => {
        task[header] = row[index]
      })
      return task
    })

    return {
      success: true,
      data: tasks,
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to retrieve tasks: ${error.toString()}`,
    }
  }
}

// Function to check in for today
function checkIn(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.STREAK)

    // Parse the request data
    let requestData = {}
    if (e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents)
    }

    // Set default values if not provided
    const today = new Date().toISOString().split("T")[0]
    const date = requestData.date || today
    const checkInTime = requestData.check_in_time || new Date().toISOString()

    // Check if there's already an entry for this date
    const data = sheet.getDataRange().getValues()
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === date) {
        return {
          success: false,
          error: `Already checked in for ${date}.`,
        }
      }
    }

    // Add new row to the sheet
    sheet.appendRow([date, checkInTime])

    // Calculate the current streak
    const streak = calculateStreak()

    return {
      success: true,
      data: {
        date: date,
        check_in_time: checkInTime,
        current_streak: streak,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to check in: ${error.toString()}`,
    }
  }
}

// Function to get the current streak
function getStreak() {
  try {
    const streak = calculateStreak()

    return {
      success: true,
      data: {
        current_streak: streak,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to calculate streak: ${error.toString()}`,
    }
  }
}

// Function to calculate the current streak
function calculateStreak() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.STREAK)
  const data = sheet.getDataRange().getValues()

  // If no data or only header, return 0
  if (data.length <= 1) {
    return 0
  }

  // Sort the dates in ascending order
  const dates = data.slice(1).map((row) => ({ date: row[0], checkInTime: row[1] }))
  dates.sort((a, b) => new Date(a.date) - new Date(b.date))

  // Get today's date and yesterday's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Convert to YYYY-MM-DD format
  const todayStr = today.toISOString().split("T")[0]
  const yesterdayStr = yesterday.toISOString().split("T")[0]

  // Check if the latest check-in is from today or yesterday
  const latestDate = dates[dates.length - 1].date
  if (latestDate !== todayStr && latestDate !== yesterdayStr) {
    return 0 // Streak is broken
  }

  // Count consecutive days
  let streak = 1 // Start with the latest day
  let currentDate = new Date(latestDate)

  for (let i = dates.length - 2; i >= 0; i--) {
    const checkInDate = new Date(dates[i].date)

    // Check if this date is the previous day
    const expectedPrevDate = new Date(currentDate)
    expectedPrevDate.setDate(expectedPrevDate.getDate() - 1)

    if (checkInDate.toISOString().split("T")[0] === expectedPrevDate.toISOString().split("T")[0]) {
      streak++
      currentDate = checkInDate
    } else {
      break // Streak is broken
    }
  }

  return streak
}

// Function to create a reminder in Google Calendar
function createReminder(e) {
  try {
    const requestData = JSON.parse(e.postData.contents)

    // Set default values if not provided
    const title = requestData.title || "Study Reminder"
    const description = requestData.description || "Time to study!"
    const startTime = requestData.startTime ? new Date(requestData.startTime) : new Date()
    const endTime = requestData.endTime ? new Date(requestData.endTime) : new Date(startTime.getTime() + 30 * 60000) // Default: 30 minutes

    // Create the calendar event
    const calendar = CalendarApp.getDefaultCalendar()
    const event = calendar.createEvent(title, startTime, endTime, {
      description: description,
    })

    return {
      success: true,
      data: {
        id: event.getId(),
        title: event.getTitle(),
        description: event.getDescription(),
        start_time: event.getStartTime().toISOString(),
        end_time: event.getEndTime().toISOString(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to create reminder: ${error.toString()}`,
    }
  }
}

// Function to check for missed check-ins and create reminders
function checkMissedCheckIns() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEETS.STREAK)
    const data = sheet.getDataRange().getValues()

    // If no data or only header, no check-ins to check
    if (data.length <= 1) {
      return {
        success: true,
        message: "No check-ins found to verify.",
      }
    }

    // Sort the dates in ascending order
    const dates = data.slice(1).map((row) => ({ date: row[0], checkInTime: row[1] }))
    dates.sort((a, b) => new Date(a.date) - new Date(b.date))

    // Get today's date and yesterday's date
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)

    // Convert to YYYY-MM-DD format
    const yesterdayStr = yesterday.toISOString().split("T")[0]

    // Check if there's a check-in for yesterday
    const latestDate = dates[dates.length - 1].date
    const latestCheckInDate = new Date(latestDate)
    latestCheckInDate.setHours(0, 0, 0, 0)

    if (latestCheckInDate.getTime() < yesterday.getTime()) {
      // No check-in for yesterday, create a reminder
      createCheckInReminder()
      return {
        success: true,
        message: "Created reminder for missed check-in.",
      }
    }

    return {
      success: true,
      message: "No missed check-ins detected.",
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to check for missed check-ins: ${error.toString()}`,
    }
  }
}

// Function to create a check-in reminder
function createCheckInReminder() {
  try {
    const title = "Study Check-in Reminder"
    const description = "You missed your study check-in yesterday. Don't break your streak!"

    // Set reminder for today at 7 AM
    const reminderTime = new Date()
    reminderTime.setHours(7, 0, 0, 0)

    // If it's already past 7 AM, set it for 30 minutes from now
    if (new Date() > reminderTime) {
      reminderTime.setTime(new Date().getTime() + 30 * 60000)
    }

    const endTime = new Date(reminderTime.getTime() + 15 * 60000) // 15 minutes

    // Create the calendar event
    const calendar = CalendarApp.getDefaultCalendar()
    const event = calendar.createEvent(title, reminderTime, endTime, {
      description: description,
    })

    return true
  } catch (error) {
    console.error(`Failed to create check-in reminder: ${error.toString()}`)
    return false
  }
}

// Function to create a Pomodoro reminder
function createPomodoroReminder() {
  try {
    const title = "Pomodoro Study Session"
    const description = "Time for your next Pomodoro study session!"

    // Set reminder for tomorrow at 9 AM
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)

    const endTime = new Date(tomorrow.getTime() + 25 * 60000) // 25 minutes

    // Create the calendar event
    const calendar = CalendarApp.getDefaultCalendar()
    const event = calendar.createEvent(title, tomorrow, endTime, {
      description: description,
    })

    return true
  } catch (error) {
    console.error(`Failed to create Pomodoro reminder: ${error.toString()}`)
    return false
  }
}

// Function to set up a daily trigger to check for missed check-ins
function setupDailyTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers()
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "checkMissedCheckIns") {
      ScriptApp.deleteTrigger(triggers[i])
    }
  }

  // Create a new trigger to run at 6 AM every day
  ScriptApp.newTrigger("checkMissedCheckIns").timeBased().atHour(6).everyDays(1).create()

  return true
}

// Helper function to generate a unique ID
function generateUniqueId(sheet, columnIndex) {
  const data = sheet.getDataRange().getValues()

  // If there's only the header row or no data
  if (data.length <= 1) {
    return 1
  }

  // Find the maximum ID
  let maxId = 0
  for (let i = 1; i < data.length; i++) {
    const id = Number.parseInt(data[i][columnIndex])
    if (!isNaN(id) && id > maxId) {
      maxId = id
    }
  }

  return maxId + 1
}

// This function can be manually called to create initial sheet structure
function createInitialSheetStructure() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID)

  // Create PomodoroLogs sheet if it doesn't exist
  let sheet = ss.getSheetByName(SHEETS.POMODORO)
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.POMODORO)
    sheet.appendRow(["id", "session_date", "duration", "note"])
    sheet.getRange("A1:D1").setFontWeight("bold")
  }

  // Create EisenhowerTasks sheet if it doesn't exist
  sheet = ss.getSheetByName(SHEETS.TASKS)
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.TASKS)
    sheet.appendRow(["id", "task", "category", "done", "created_at"])
    sheet.getRange("A1:E1").setFontWeight("bold")
  }

  // Create DailyStreak sheet if it doesn't exist
  sheet = ss.getSheetByName(SHEETS.STREAK)
  if (!sheet) {
    sheet = ss.insertSheet(SHEETS.STREAK)
    sheet.appendRow(["date", "check_in_time"])
    sheet.getRange("A1:B1").setFontWeight("bold")
  }

  return {
    success: true,
    message: "Initial sheet structure created successfully.",
  }
}

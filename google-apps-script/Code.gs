// Google Apps Script file to be deployed as a web app

// Spreadsheet ID
const SPREADSHEET_ID = '1evWM9IQ8JOf3mpH0-1QVYgoj1xGu4iZCFxmw2xuIpAo';

// Sheet names
const POMODORO_SHEET = 'PomodoroLogs';
const TASKS_SHEET = 'EisenhowerTasks';
const STREAK_SHEET = 'DailyStreak';

// Main function to handle HTTP requests
function doPost(e) {
  try {
    // Parse the request
    const request = JSON.parse(e.postData.contents);
    const action = request.action;
    const data = request.data;
    
    let result;
    
    // Route to the appropriate handler based on the action
    switch (action) {
      case 'addPomodoro':
        result = addPomodoro(data);
        break;
      case 'addTask':
        result = addTask(data);
        break;
      case 'checkIn':
        result = checkIn(data);
        break;
      case 'getStreak':
        result = getStreak();
        break;
      case 'createReminder':
        result = createReminder(data);
        break;
      case 'checkMissedCheckIn':
        result = checkMissedCheckIn();
        break;
      default:
        result = { error: 'Invalid action' };
    }
    
    // Return the result
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Add a new Pomodoro session
function addPomodoro(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(POMODORO_SHEET);
  
  // Check if required fields are present
  if (!data.session_date || !data.duration) {
    return { error: 'Missing required fields: session_date and duration are required' };
  }
  
  // Check if there's already a session for this date
  const lastRow = sheet.getLastRow();
  const sessionDates = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  
  for (let i = 0; i < sessionDates.length; i++) {
    if (sessionDates[i][0] === data.session_date) {
      return { error: 'A session already exists for this date' };
    }
  }
  
  // Generate a new ID
  const id = Utilities.getUuid();
  
  // Add the new session
  sheet.appendRow([
    id,
    data.session_date,
    data.duration,
    data.note || ''
  ]);
  
  return { 
    success: true, 
    message: 'Pomodoro session added successfully',
    id: id
  };
}

// Add a new task
function addTask(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(TASKS_SHEET);
  
  // Check if required fields are present
  if (!data.task || !data.category) {
    return { error: 'Missing required fields: task and category are required' };
  }
  
  // Generate a new ID
  const id = Utilities.getUuid();
  
  // Add the new task
  sheet.appendRow([
    id,
    data.task,
    data.category,
    data.done || false,
    data.created_at || new Date().toISOString()
  ]);
  
  return { 
    success: true, 
    message: 'Task added successfully',
    id: id
  };
}

// Check in for today
function checkIn(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(STREAK_SHEET);
  
  const date = data.date || new Date().toISOString().split('T')[0];
  const checkInTime = data.check_in_time || new Date().toISOString();
  
  // Check if there's already a check-in for this date
  const lastRow = sheet.getLastRow();
  const dates = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  
  for (let i = 0; i < dates.length; i++) {
    if (dates[i][0] === date) {
      return { error: 'Already checked in for this date' };
    }
  }
  
  // Add the new check-in
  sheet.appendRow([
    date,
    checkInTime
  ]);
  
  // Get the current streak
  const streak = getStreak();
  
  return { 
    success: true, 
    message: 'Check-in successful',
    streak: streak.streak
  };
}

// Get the current streak
function getStreak() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(STREAK_SHEET);
  
  // Get all dates
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { streak: 0 };
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  
  // Sort by date
  data.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  
  // Calculate streak
  let streak = 1;
  let currentDate = new Date(data[data.length - 1][0]);
  
  for (let i = data.length - 2; i >= 0; i--) {
    const prevDate = new Date(data[i][0]);
    const diffTime = Math.abs(currentDate - prevDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }
  
  return { 
    streak: streak,
    lastCheckIn: data[data.length - 1][0]
  };
}

// Create a reminder in Google Calendar
function createReminder(data) {
  // Check if required fields are present
  if (!data.title || !data.start_time) {
    return { error: 'Missing required fields: title and start_time are required' };
  }
  
  // Create the event
  const calendar = CalendarApp.getDefaultCalendar();
  const startTime = new Date(data.start_time);
  const endTime = data.end_time ? new Date(data.end_time) : new Date(startTime.getTime() + 30 * 60000);
  
  const event = calendar.createEvent(
    data.title,
    startTime,
    endTime,
    {
      description: data.description || ''
    }
  );
  
  return { 
    success: true, 
    message: 'Reminder created successfully',
    eventId: event.getId()
  };
}

// Check for missed check-ins and create reminders
function checkMissedCheckIn() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(STREAK_SHEET);
  
  // Get all dates
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { message: 'No check-ins yet' };
  }
  
  const data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  
  // Sort by date
  data.sort((a, b) => new Date(a[0]) - new Date(b[0]));
  
  // Check if yesterday's check-in is missing
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  const lastCheckIn = new Date(data[data.length - 1][0]);
  const diffTime = Math.abs(today - lastCheckIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 1 && data[data.length - 1][0] !== yesterdayStr) {
    // Create a reminder for 7 AM today
    const reminderTime = new Date(today);
    reminderTime.setHours(7, 0, 0, 0);
    
    // Only create reminder if it's before 7 AM
    if (today.getHours() < 7) {
      createReminder({
        title: 'Missed Check-in Reminder',
        description: 'You missed your check-in yesterday. Remember to study today!',
        start_time: reminderTime.toISOString(),
        end_time: new Date(reminderTime.getTime() + 30 * 60000).toISOString()
      });
      
      return { 
        success: true, 
        message: 'Reminder created for missed check-in',
        lastCheckIn: data[data.length - 1][0]
      };
    }
  }
  
  return { 
    success: true, 
    message: 'No missed check-ins',
    lastCheckIn: data[data.length - 1][0]
  };
}

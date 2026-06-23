// ─────────────────────────────────────────────────────────────
//  GOOGLE APPS SCRIPT FOR AQUASMILE CLINIC APPOINTMENTS
// ─────────────────────────────────────────────────────────────
//
// Copy and paste this entire code into your Google Sheets Apps Script:
// 1. In your Google Sheet, open: Extensions > Apps Script
// 2. Paste this code to replace any existing content
// 3. Save the script project
// 4. Click: Deploy > New Deployment
// 5. Select type: Web App
// 6. Set "Execute as" to: Me (your-account@gmail.com)
// 7. Set "Who has access" to: Anyone
// 8. Deploy and copy the Web App URL to your .env file
//
// ─────────────────────────────────────────────────────────────

// CHANGE THIS PASSWORD TO MATCH YOUR site.ts / .env CONFIGURATION
var ADMIN_SECRET = "AquaSmileAdmin2026";
var CACHE_KEY = "all_bookings_cache";

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var action = e.parameter.action;
    
    // 1. ACTION: FETCH ALL BOOKINGS (For Admin Dashboard)
    if (action === "getAll") {
      var secret = e.parameter.secret;
      if (secret !== ADMIN_SECRET) {
        return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      // Try fetching from Cache first for near-instant loads
      var cache = CacheService.getScriptCache();
      var cached = cache.get(CACHE_KEY);
      if (cached != null) {
        return ContentService.createTextOutput(cached)
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      var data = sheet.getDataRange().getValues();
      var bookings = [];
      for (var i = 1; i < data.length; i++) {
        bookings.push({
          rowNum: i + 1,
          timestamp: data[i][0],
          firstName: data[i][1],
          lastName: data[i][2],
          phone: data[i][3],
          email: data[i][4],
          service: data[i][5],
          date: normalizeDate(data[i][6]),
          time: normalizeTime(data[i][7]),
          message: data[i][8],
          appointmentId: data[i][9],
          status: data[i][10] || "Pending"
        });
      }
      
      // Return list sorted by booking date (newest first)
      bookings.sort(function(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      
      var bookingsJson = JSON.stringify({ bookings: bookings });
      
      // Store in cache (limit 100KB, set max 30 mins)
      try {
        if (bookingsJson.length < 100000) {
          cache.put(CACHE_KEY, bookingsJson, 1800);
        }
      } catch (cacheErr) {}
      
      return ContentService.createTextOutput(bookingsJson)
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // 2. ACTION: GET BOOKED SLOTS FOR A SPECIFIC DATE (Existing Flow)
    var targetDate = e.parameter.date;
    var bookedSlots = [];
    var data = sheet.getDataRange().getValues();
    
    if (targetDate) {
      for (var i = 1; i < data.length; i++) {
        var rowDate = normalizeDate(data[i][6]);
        var rowTime = normalizeTime(data[i][7]);
        var rowStatus = data[i][10] || "Pending";
        
        // Only count as booked if not cancelled
        if (rowDate === targetDate && rowStatus !== "Cancelled") {
          bookedSlots.push(rowTime);
        }
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ bookedSlots: bookedSlots }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  // Clear the cache immediately on any new booking or status update
  try {
    CacheService.getScriptCache().remove(CACHE_KEY);
  } catch (cacheErr) {}

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Set up header columns if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "First Name", "Last Name", "Phone", "Email", "Service", "Date", "Time", "Message", "Appointment ID", "Status"]);
  }
  
  var timestamp = new Date();
  var data = {};
  
  try {
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    data = e.parameter || {};
  }
  
  if (Object.keys(data).length === 0 && e.postData && e.postData.contents) {
    try {
      var parts = e.postData.contents.split('&');
      for (var i = 0; i < parts.length; i++) {
        var pair = parts[i].split('=');
        data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
      }
    } catch(err) {}
  }

  // 1. ACTION: UPDATE AN APPOINTMENT (Confirm, Reschedule, Cancel)
  if (data.action === "update") {
    var secret = data.secret;
    if (secret !== ADMIN_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var appointmentId = data.appointmentId;
    var newStatus = data.status;
    var newDate = data.date;
    var newTime = data.time;
    
    var sheetData = sheet.getDataRange().getValues();
    var foundRow = -1;
    
    for (var i = 1; i < sheetData.length; i++) {
      if (sheetData[i][9] === appointmentId) {
        foundRow = i + 1;
        break;
      }
    }
    
    if (foundRow === -1) {
      return ContentService.createTextOutput(JSON.stringify({ error: "Appointment ID not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (newStatus) {
      sheet.getRange(foundRow, 11).setValue(newStatus); // Col K
    }
    if (newDate) {
      sheet.getRange(foundRow, 7).setValue(newDate);   // Col G
    }
    if (newTime) {
      sheet.getRange(foundRow, 8).setValue(newTime);   // Col H
    }
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. ACTION: SUBMIT A NEW BOOKING (Existing Flow)
  var targetDate = data.appointmentDate || "";
  var formattedDate = targetDate.replace(/-/g, "");
  
  var count = 0;
  if (targetDate) {
    var sheetData = sheet.getDataRange().getValues();
    for (var i = 1; i < sheetData.length; i++) {
      var rowDate = normalizeDate(sheetData[i][6]);
      if (rowDate === targetDate) {
        count++;
      }
    }
  }
  
  var nextIndex = count + 1;
  var indexStr = ("0000" + nextIndex).slice(-4);
  var appointmentId = "A-" + (formattedDate || "UNKNOWN") + "-" + indexStr;

  sheet.appendRow([
    timestamp,
    data.firstName || "",
    data.lastName || "",
    data.phone || "",
    data.email || "",
    data.service || "",
    targetDate,
    data.appointmentTime || "",
    data.message || "",
    appointmentId,
    "Pending" // Default status
  ]);
  
  var response = {
    result: "success",
    appointmentId: appointmentId
  };
  
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeDate(rowDate) {
  if (rowDate instanceof Date) {
    var year = rowDate.getFullYear();
    var month = ("0" + (rowDate.getMonth() + 1)).slice(-2);
    var day = ("0" + rowDate.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }
  return rowDate;
}

function normalizeTime(rowTime) {
  if (rowTime instanceof Date) {
    try {
      var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
      return Utilities.formatDate(rowTime, tz, "HH:mm");
    } catch(e) {
      var hours = ("0" + rowTime.getHours()).slice(-2);
      var minutes = ("0" + rowTime.getMinutes()).slice(-2);
      return hours + ":" + minutes;
    }
  }
  if (typeof rowTime === "string") {
    if (rowTime.indexOf("T") !== -1) {
      var timePart = rowTime.split("T")[1];
      return timePart.substring(0, 5);
    }
    return rowTime.substring(0, 5);
  }
  return rowTime;
}

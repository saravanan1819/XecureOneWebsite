const { google } = require("googleapis");
const credentials = require("./Credentials.json");
require("dotenv").config();
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

exports.appendToSheet = async (values) => {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const range = "Sheet1";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [values],
    },
  });
};

exports.updateStatusInSheet = async (email, date, newStatus) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = "Sheet1";

  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}`,
  });

  const rows = getRes.data.values;

  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  const rowIndex = rows.findIndex((row) => row[1] === email && row[4] === date);
  if (rowIndex === -1) {
    console.log("Row not found.");
    return;
  }

  const statusColumnIndex = 6;

  const updateRes = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!G${rowIndex + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[newStatus]],
    },
  });

  console.log("Status updated in Google Sheets:", updateRes.status);
};

exports.updateRescheduleInSheet = async (
  email,
  oldDate,
  oldTime,
  newDate,
  newTime
) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = "Sheet1";

  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}`,
  });

  const rows = getRes.data.values;

  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  const emailIndex = 1; // Column B
  const dateIndex = 4; // Column E
  const timeIndex = 5; // Column F
  const statusIndex = 6; // Column G

  const rowIndex = rows.findIndex(
    (row) =>
      row[emailIndex] === email &&
      row[dateIndex] === oldDate &&
      row[timeIndex] === oldTime
  );

  if (rowIndex === -1) {
    console.log("Matching row not found.");
    return;
  }

  const rowNumber = rowIndex + 1;

  const updateData = [
    {
      range: `${sheetName}!${String.fromCharCode(65 + dateIndex)}${rowNumber}`, // E
      values: [[newDate]],
    },
    {
      range: `${sheetName}!${String.fromCharCode(65 + timeIndex)}${rowNumber}`, // F
      values: [[newTime]],
    },
    {
      range: `${sheetName}!${String.fromCharCode(
        65 + statusIndex
      )}${rowNumber}`, // G
      values: [["rescheduled"]],
    },
  ];

  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: "USER_ENTERED",
      data: updateData,
    },
  });

  console.log("Date, Time, and Status successfully updated in Google Sheets.");
};

exports.appendContactToSheet = async ({
  name,
  email,
  location,
  companyType,
  message,
}) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  const status = "new";
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = "Sheet2";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[name, email, location, companyType, message, now, status]],
    },
  });

  console.log("✅ Contact form data appended to Google Sheets");
};

exports.updateContactStatusInSheet = async (email, name) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = "Sheet2";
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}`,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("❌ No data found.");
    return;
  }

  const rowIndex = rows.findIndex((row) => row[1] === email && row[0] === name);

  if (rowIndex === -1) {
    console.log("❌ No matching row found for email and submittedAt.");
    return;
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!G${rowIndex + 1}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["replied"]],
    },
  });

  console.log(`✅ Status updated to "replied" for ${email} in Google Sheets`);
};

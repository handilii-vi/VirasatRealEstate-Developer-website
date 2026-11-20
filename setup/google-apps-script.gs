/* ============================================================
   Virasat Real Estate | lead collector for Google Sheets
   How to use: see README.md, step 2.
   ============================================================ */

// 1) Choose a long, private password. You type it on the admin page.
const SECRET = "CHANGE-THIS-TO-A-LONG-PRIVATE-PASSWORD";

// 2) Every new lead is also emailed here. Use "" to switch email off.
const NOTIFY_EMAIL = "sales@virasatrealestate.com";

const HEAD = ["Time", "Name", "Phone", "Email", "Colony", "Plot size", "Message", "Source", "Page", "Language", "UTM"];

function sheet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) { sh.appendRow(HEAD); sh.setFrozenRows(1); sh.getRange(1, 1, 1, HEAD.length).setFontWeight("bold"); }
  return sh;
}
// stops spreadsheet formulas typed into a form from running
function safe_(v) {
  v = String(v == null ? "" : v).slice(0, 1000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// the website posts new leads here
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.phone) return json_({ ok: false });
    const sh = sheet_();
    sh.appendRow([new Date(d.time || Date.now()), safe_(d.name), "", safe_(d.email), safe_(d.colony), safe_(d.plot),
                  safe_(d.message), safe_(d.source), safe_(d.page), safe_(d.lang), safe_(d.utm)]);
    sh.getRange(sh.getLastRow(), 3).setNumberFormat("@").setValue(String(d.phone).slice(0, 15));
    if (NOTIFY_EMAIL) {
      try {
        MailApp.sendEmail(NOTIFY_EMAIL, "New lead: " + d.name + " (" + (d.colony || "website") + ")",
          "Name: " + d.name + "\nPhone: " + d.phone + "\nEmail: " + (d.email || "-") + "\nColony: " + (d.colony || "-") +
          "\nPlot size: " + (d.plot || "-") + "\nMessage: " + (d.message || "-") + "\nSource: " + (d.source || "-"));
      } catch (err) {}
    }
    return json_({ ok: true });
  } finally { lock.releaseLock(); }
}

// the admin page reads leads from here (needs the password)
function doGet(e) {
  if (!e || !e.parameter || e.parameter.key !== SECRET) return json_({ error: "denied" });
  return json_(sheet_().getDataRange().getValues());
}

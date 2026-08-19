/*
  Avenue Estate — приймання заявок із сайту в Google-таблицю.

  Цей код живе не в проєкті, а всередині самої таблиці:
  Розширення → Apps Script. Далі його публікують як веб-застосунок,
  і отриману адресу вписують у src/config.js → CONTACT.sheetEndpoint.

  Покрокова інструкція для Діани — у docs/google-sheet.md.
*/

// Назва аркуша, куди складати заявки. Якщо такого немає — створиться сам.
var SHEET_NAME = 'Заявки з сайту'

var HEADERS = ['Дата', 'Імʼя', 'Телефон', 'Пошта', 'Що цікавить', 'Коментар', 'Сторінка']

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)
    var sheet = getSheet_()

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.interest || '',
      data.comment || '',
      data.page || '',
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Перевірка з браузера: відкривши адресу застосунку, маєш побачити "Avenue Estate: OK".
function doGet() {
  return ContentService.createTextOutput('Avenue Estate: OK')
}

function getSheet_() {
  var book = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = book.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME)
  }

  // шапка таблиці — ставимо один раз, на порожньому аркуші
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.setColumnWidth(1, 150)
    sheet.setColumnWidth(6, 320)
  }

  return sheet
}

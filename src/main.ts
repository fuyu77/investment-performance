// スプレッドシートに編集があった際に動作する。
function onEdit(event) {
 // 表の各列を定数として指定する。
  const DATE = 1;
  const TOPIX = 2;
  const STOCKS = 3;
  const CASH = 4;
  const PRINCIPAL = 5;
  const RATE_OF_CHANGE = 6;
  const TOPIX_RATE_OF_CHANGE = 7;
  const LAST_COLUMN = TOPIX_RATE_OF_CHANGE;
　// 現在開いているシートを取得する。
  var sheet = SpreadsheetApp.getActiveSheet()
  
  if (sheet.getName() !== "all time") {
  // 値の存在する最終行を取得する。
  var lastRow = sheet.getLastRow();
  
  // 表のヘッダー以外の部分の値を二次元配列として取得する。
  var values = sheet.getRange(2, DATE, lastRow - 1, LAST_COLUMN).getValues();
  
  // 最終行の「日付」列に値が無い場合は、現在日付を入力する。
  if (values[lastRow - 2][DATE - 1] == "") {
    values[lastRow - 2][DATE - 1] = new Date(); 
  }
  
  // 最終行の「現金残高」列に値が無い場合は、一つ前の行の値をコピーする。
  if (values[lastRow - 2][CASH - 1] == "") {
    values[lastRow - 2][CASH - 1] = values[lastRow - 3][CASH - 1]; 
  }
  
  // 最終行の「元本」列に値が無い場合は、一つ前の行の値をコピーする。
  if (values[lastRow - 2][PRINCIPAL - 1] == "") {
    values[lastRow - 2][PRINCIPAL - 1] = values[lastRow - 3][PRINCIPAL - 1]; 
  }
  
  // 2行目から最終行まで計算する。
  for (var i = 0; i <= lastRow - 2; i ++) {
    // 騰落率 = (株式時価総額 + 現金残高) / 元本
    values[i][RATE_OF_CHANGE - 1] = (values[i][STOCKS - 1] + values[i][CASH - 1]) / values[i][PRINCIPAL - 1];
    // TOPIX騰落率 = TOPIX / 2017/4/28のTOPIX
    values[i][TOPIX_RATE_OF_CHANGE - 1] = values[i][TOPIX - 1] / values[0][TOPIX - 1];
  }
  
  // 二次元配列の値をシートにセットする。
  sheet.getRange(2, DATE, lastRow - 1, LAST_COLUMN).setValues(values);
  } else {
  
  // 値の存在する最終行を取得する。
  var lastRow = sheet.getLastRow();
  
  // 最新2行の価を二次元配列として取得する。
  var values = sheet.getRange(lastRow - 1, DATE, 2, LAST_COLUMN).getValues();
  
  // 最終行の「日付」列に値が無い場合は、現在日付を入力する。
  if (values[1][DATE - 1] == "") {
    values[1][DATE - 1] = new Date(); 
  }
  
  // 最終行の「現金残高」列に値が無い場合は、一つ前の行の値をコピーする。
  if (values[1][CASH - 1] == "") {
    values[1][CASH - 1] = values[0][CASH - 1]; 
  }
  
  // 最終行の「元本」列に値が無い場合は、一つ前の行の値をコピーする。
  if (values[1][PRINCIPAL - 1] == "") {
    values[1][PRINCIPAL - 1] = values[0][PRINCIPAL - 1]; 
  }
  
  // 2行目から最終行まで計算する。
  for (var i = 0; i <= 1; i ++) {
    // 騰落率 = (株式時価総額 + 現金残高) / 元本
    values[i][RATE_OF_CHANGE - 1] = (values[i][STOCKS - 1] + values[i][CASH - 1]) / values[i][PRINCIPAL - 1];
    // TOPIX騰落率 = TOPIX / 2017/4/28のTOPIX
    values[i][TOPIX_RATE_OF_CHANGE - 1] = values[i][TOPIX - 1] / sheet.getRange(2, TOPIX).getValue();;
  }
  
  // 二次元配列の値をシートにセットする。
  sheet.getRange(lastRow - 1, DATE, 2, LAST_COLUMN).setValues(values);
  }
}

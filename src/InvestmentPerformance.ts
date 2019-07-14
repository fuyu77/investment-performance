import Sheet = GoogleAppsScript.Spreadsheet.Sheet
import Range = GoogleAppsScript.Spreadsheet.Range

export default class InvestmentPerformance {
  private readonly DATE = 0
  private readonly TOPIX = 1
  private readonly PORTFOLIO = 2
  private readonly CASH = 3
  private readonly PRINCIPAL = 4
  private readonly PORTFOLIO_RATE  = 5
  private readonly TOPIX_RATE = 6
  private readonly MEMO = 7
  private readonly LAST_COLUMN = this.MEMO

  private sheet: Sheet
  private range: Range
  private lastRow: number
  private values: any[][]

  public constructor() {
    this.sheet = SpreadsheetApp.getActiveSheet()
    this.lastRow = this.sheet.getLastRow()
    this.range = this.sheet.getRange(2, 1, this.lastRow - 1, this.LAST_COLUMN + 1)
    this.values = this.range.getValues()
  }

  public setValues(): void {
    this.range.setValues(this.values)
  }

  public setDate(): void {
    if (this.values[this.lastRow - 2][this.DATE] === "") {
      this.values[this.lastRow - 2][this.DATE] = new Date()
    }
  }

  public copyPreviousCash(): void {
    if (this.values[this.lastRow - 2][this.CASH] === "") {
      this.values[this.lastRow - 2][this.CASH] = this.values[this.lastRow - 3][this.CASH]
    }
  }

  public copyPreviousPrincipal(): void {
    if (this.values[this.lastRow - 2][this.PRINCIPAL] === "") {
      this.values[this.lastRow - 2][this.PRINCIPAL] = this.values[this.lastRow - 3][this.PRINCIPAL]
    }
  }

  public setPortforioRates(): void {
    this.values.forEach((record): number => record[this.PORTFOLIO_RATE] = (record[this.PORTFOLIO] + record[this.CASH]) / record[this.PRINCIPAL])
  }

  public setTopixRates(): void {
    this.values.forEach((record): number => record[this.TOPIX_RATE] = record[this.TOPIX] / this.values[0][this.TOPIX])
  }
}

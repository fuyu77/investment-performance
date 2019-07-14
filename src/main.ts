import InvestmentPerformance from "./InvestmentPerformance"

function onEdit() {
  const investmentPerformance = new InvestmentPerformance()
  investmentPerformance.setDate()
  investmentPerformance.copyPreviousCash()
  investmentPerformance.copyPreviousPrincipal()
  investmentPerformance.setPortforioRates()
  investmentPerformance.setTopixRates()
  investmentPerformance.setValues()
}

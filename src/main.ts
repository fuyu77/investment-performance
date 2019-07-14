import InvestmentPerformance from "./InvestmentPerformance"

function onEdit() {
  const investmentPerformance = new InvestmentPerformance()
  investmentPerformance.setDate()
  investmentPerformance.setCash()
  investmentPerformance.setPrincipal()
  investmentPerformance.setPortforioRates()
  investmentPerformance.setTopixRates()
  investmentPerformance.setValues()
}

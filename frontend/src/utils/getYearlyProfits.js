
export function getYearlyProfits(salesData) {
  const profits = {2023: 0, 2024: 0}

  salesData.forEach(sale => {
    const year = sale.date.toString().substring(0, 4); 
    
    if (year === "2023")
    {
      profits[2023] += parseInt(sale.profit, 10);
    } else if (year === "2024")
    {
      profits[2024] += parseInt(sale.profit, 10);
    }
  });

  const percantageProfits = ((profits[2024] - profits[2023]) / profits[2023]) * 100;

  return { profits, percantageProfits };
}
  
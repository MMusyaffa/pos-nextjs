
export function getYearlySales(salesData) {
    const yearlySales = {};
  
    salesData.forEach((sale) => {
      const year = sale.date.toString().substring(0, 4);
      const sellings = sale.selling;
  
      if (!yearlySales[year]) {
        yearlySales[year] = 0;
      }
  
      yearlySales[year] += sellings;
    });
  
    return yearlySales;
  }
  
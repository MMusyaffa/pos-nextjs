
export const seriesColumnChart = (sellingsData, expensesData) => ([
    {
        name: 'Selling this month',
        data: sellingsData,
    },
    {
        name: 'Expense this month',
        data: expensesData, 
    },
]);

import { useEffect, useState } from "react";
import { getSalesData } from '@/api/history';

export function useMonthlySalesChart() {
    const currentYear = new Date().getFullYear();
    const [seriesMonthlycolumnchart, setSeriesMonthlycolumnchart] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getSalesData();
                const salesData = data; // Pastikan data API sesuai dengan key 'sales'

                const monthlyTotals = salesData.reduce((acc, sale) => {
                    const saleDate = String(sale.date);
                    const year = Number(saleDate.substring(0, 4));
                    const month = Number(saleDate.substring(4, 6)); // Ambil bulan

                    // Hanya akumulasi data jika tahun sesuai dengan tahun saat ini
                    if (year === currentYear) {
                        if (!acc[month]) {
                            acc[month] = { selling: 0, profit: 0 };
                        }
                        acc[month].selling += sale.selling;
                        acc[month].profit += Number(sale.profit); // Pastikan profit berupa angka
                    }

                    return acc;
                }, {});

                const sellingData = Array.from({ length: 12 }, (_, i) => monthlyTotals[i + 1]?.selling || 0);
                const profitData = Array.from({ length: 12 }, (_, i) => monthlyTotals[i + 1]?.profit || 0);

                // Set hasil ke state seriesMonthlycolumnchart
                setSeriesMonthlycolumnchart([
                    {
                        name: 'Selling',
                        color: '#4F46E5',
                        data: sellingData,
                    },
                    {
                        name: 'Profit',
                        color: '#34D399',
                        data: profitData,
                    },
                ]);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        }

        fetchData();
    }, []);

    return seriesMonthlycolumnchart;
}

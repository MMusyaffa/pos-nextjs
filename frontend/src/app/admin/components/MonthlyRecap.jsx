import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { optionsMonthlycolumnchart } from '@/utils/optionsMonthlycolumnchart';
import { useMonthlySalesChart } from '@/utils/seriesMonthlycolumnchart';
import { getSalesData } from '@/api/history';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MonthlyRecap() {
    const [currentMonthData, setCurrentMonthData] = useState(null);
    const [previousMonthData, setPreviousMonthData] = useState(null);
    const seriesMonthlycolumnchart = useMonthlySalesChart();

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const salesData = await getSalesData(); // Fetch sales data from the API

                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const currentMonthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString();

                const currentMonthSales = salesData.filter(sale => {
                    const saleDate = String(sale.date);
                    const saleMonth = saleDate.substring(4, 6);
                    return saleMonth === currentMonthFormatted;
                });

                const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                const previousMonthFormatted = previousMonth < 10 ? `0${previousMonth}` : previousMonth.toString();

                const previousMonthSales = salesData.filter(sale => {
                    const saleDate = String(sale.date);
                    const saleMonth = saleDate.substring(4, 6);
                    return saleMonth === previousMonthFormatted;
                });

                const calculateTotal = (salesData) => {
                    return salesData.reduce((totals, sale) => {
                        totals.selling += sale.selling;
                        totals.profit += Number(sale.profit);
                        return totals;
                    }, { selling: 0, profit: 0 });
                };

                setCurrentMonthData(calculateTotal(currentMonthSales));
                setPreviousMonthData(calculateTotal(previousMonthSales));
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, []);

    if (!currentMonthData || !previousMonthData) {
        return <div>Loading...</div>;
    }

    const currentTotal = currentMonthData.profit + currentMonthData.selling;
    const previousTotal = previousMonthData.profit + previousMonthData.selling;

    const percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;

    return (
        <div className="card shadow-md bg-base-100 p-4 mr-10 pb-6">
            <div className="flex justify-between items-center">
                <h2 className="card-title">Monthly Recaps</h2>
            </div>
            <div className="mt-2">
                <h3 className="text-2xl font-bold mt-1">{currentMonthData.profit.toLocaleString('id-ID', 
                                                        { style: 'currency', currency: 'IDR', 
                                                        minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
                <h4 className="text-2xl font-bold mt-1">{currentMonthData.selling.toLocaleString()} Sells</h4>
                <div className="flex items-center space-x-2 mt-3">
                    <div className={`flex items-center justify-center rounded-full w-7 h-7 
                        ${percentageChange >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                            {percentageChange >= 0 ? (
                                <FaArrowUp className="text-green-500" size={20} />
                            ) : (
                                <FaArrowDown className="text-red-500" size={20} />
                            )}
                    </div>
                    <span className="font-semibold text-sm">
                        {percentageChange.toFixed(2)}%
                    </span>
                    <span className="text-sm text-gray-500">last month</span>
                </div>
            </div>
            <div className="mt-4">
                <Chart options={optionsMonthlycolumnchart} series={seriesMonthlycolumnchart}
                    type="area" height={60} width={"100%"} />
            </div>
        </div>
    );
}

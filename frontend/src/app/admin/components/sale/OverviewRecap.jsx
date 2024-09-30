import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { optionsColumnChart } from '@/utils/optionsColumnChart';
import { seriesColumnChart } from '@/utils/seriesColumnChart';
import { getSalesData } from '@/api/history';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesRecap() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);

    const [categories, setCategories] = useState([]);
    const [sellingsData, setsellingsData] = useState([]);
    const [expensesData, setExpensesData] = useState([]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try{
                const salesData = await getSalesData();
                
                const filteredData = salesData.filter(item => {
                    const itemDate = item.date.toString(); // Ubah menjadi string
                    const itemYear = parseInt(itemDate.substring(0, 4), 10);  // Ambil tahun
                    const itemMonth = parseInt(itemDate.substring(4, 6), 10); // Ambil bulan
        
                    return itemYear === parseInt(year, 10) && itemMonth === parseInt(month, 10);
                });
                
                setCategories(filteredData.map(item => {
                    const itemDate = item.date.toString();
                    const day = itemDate.substring(6, 8);  // Ambil hari dari format YYYYMMDD
                    return `${day}/${month}/${year}`; // Format ulang jadi DD/MM/YYYY
                }));
                setsellingsData(filteredData.map(item => item.selling));
                setExpensesData(filteredData.map(item => item.expenses));

            } catch (error){
                console.error("Error fetching sales data:", error);
            }
        };

        fetchSalesData();
    }, [month, year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <div className="card shadow-md bg-base-100 ml-56 mt-10 mr-10">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="card-title">Sales Recap</h2>
                    <div className="flex gap-2">
                        <select
                            className="select select-bordered select-sm"
                            value={month}
                            onChange={handleChange}
                        >
                            <option value={1}>January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                        </select>
                        <select
                            className="select select-bordered select-sm"
                            value={year}
                            onChange={handleYearChange}
                            >
                            <option value={2023}>2023</option>
                            <option value={2024}>2024</option>
                        </select>
                    </div>
                </div>
                <Chart
                    options={optionsColumnChart(categories)}
                    series={seriesColumnChart(sellingsData, expensesData)}
                    type="bar"
                    height={370}
                    width={"100%"}
                />
            </div>
        </div>
    );
}

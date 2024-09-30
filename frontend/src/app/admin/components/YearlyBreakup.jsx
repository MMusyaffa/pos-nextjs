import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { optionsRoundColumnChart } from "@/utils/optionsRoundColumnChart";
import { getYearlyProfits } from "@/utils/getYearlyProfits";
import { getYearlySales } from "@/utils/getYearlySales";
import { getSalesData } from '@/api/history';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function YearlyBreakup() {
  const [salesData, setSalesData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getSalesData();
                setSalesData(data); // Pastikan API mengembalikan objek yang sesuai dengan key "sales"
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } 
        }
        fetchData();
    }, []);

    if (!salesData) {
        return <p>No data available</p>; // Placeholder jika tidak ada data
    }

    // Gunakan salesData yang telah diambil dari API
    const { profits, percantageProfits } = getYearlyProfits(salesData);
    const yearlySales = getYearlySales(salesData);

    const sales2023 = yearlySales["2023"] || 0;
    const sales2024 = yearlySales["2024"] || 0;
    const seriesRoundColumnChart = [sales2023, sales2024];

    const isProfits = profits[2024] > profits[2023];
    const profitChangeIcon = isProfits
        ? <FaArrowUp className="m-auto mt-1" size={20} color="#39B69A" />
        : <FaArrowDown className="m-auto mt-1" size={20} color="#39B69A" />;

    const bgColor = isProfits ? "bg-green-100" : "bg-red-100";

  return (
    <div className="card bg-base-100 shadow-md p-5 mt-10 mr-10">
      <h2 className="card-title">Yearly Breakup</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mt-4">
        {/* Left Column */}
        <div className="flex-1">
          <p className="text-3xl font-bold">{ 
            profits[2024].toLocaleString('id-ID', { style: 'currency', currency: 'IDR', 
                                    minimumFractionDigits: 0, maximumFractionDigits: 0 }) 
          }</p>
          <div className="flex items-center mt-2 space-x-2">
            <div className="avatar">
              <div className={ `w-7 h-7 ${bgColor} rounded-full flex justify-center items-center` }>
                { profitChangeIcon } 
              </div>
            </div>
            <p className="text-sm font-semibold">{ percantageProfits.toFixed(2) }%</p>
            <p className="text-sm text-gray-500">last year</p>
          </div>
          <div className="flex mt-6 space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-custom-blue rounded-full"></div>
              <p className="text-sm text-gray-500">2023</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <p className="text-sm text-gray-500">2024</p>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="flex-1">
          <Chart
            options={optionsRoundColumnChart}
            series={seriesRoundColumnChart}
            type="donut"
            height={150}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};
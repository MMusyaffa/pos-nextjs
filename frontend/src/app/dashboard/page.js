import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import NavbarAdmin from '../admin/components/Navbar';
import SalesOverview from '../admin/components/SalesOverview';
import YearlyBreakup from '../admin/components/YearlyBreakup';
import MonthlyRecap from '../admin/components/MonthlyRecap';
import ProductPerformance from '../admin/components/ProductPerformance';
import BoardgamePerformance from '../admin/components/BoardgamePerformance';

export default function Dashboard() {

    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="flex space-x-10">
                <div className="w-4/6">
                    <SalesOverview />
                </div>
                <div className="w-1/3">
                    <YearlyBreakup />
                    <div className="mt-10">
                        <MonthlyRecap />
                    </div>
                </div>
            </div>
            <div className="flex space-x-10">
                <div className="w-2/4">
                    <BoardgamePerformance />
                </div>
                <div className="w-4/6">
                    <ProductPerformance />
                </div>
            </div>
        </div>
    );
}

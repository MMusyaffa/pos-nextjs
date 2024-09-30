"use client"

import NavbarAdmin from "../components/Navbar";
import HistoryProduct from "../components/history/ProductHistory";
import HistoryBoardGames from "../components/history/BoardgameHistory";

export default function HistoriesList() 
{   
    return (
        <div className="w-full">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <HistoryProduct />
            <div>
                <HistoryBoardGames />
            </div>
        </div>
    );
} 
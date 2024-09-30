"use client"

import NavbarAdmin from "../components/Navbar";
import SalesRecap from "../components/sale/OverviewRecap";
import ProductRecap from "../components/sale/ProductRecap";
import BoardgameRecap from "../components/sale/BoardgameRecap";

export default function SalesList() 
{   
    return (
        <div className="w-full">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <SalesRecap />
            <div>
                <ProductRecap />
            </div>
            <div>
                <BoardgameRecap />
            </div>
        </div>
    );
} 
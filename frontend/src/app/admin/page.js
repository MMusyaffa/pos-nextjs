"use client"

import React, { useState } from "react";
import SideBarAdmin from "./components/SidebarAdmin";
import ProductsList from "./products/page";
import CategoriesList from "./categories/page";
import HistoriesList from "./histories/page";
import { AdminSidebarContext } from "@/utils/contexts";

export default function Admin() {

  const [selectedContent, setSelectedContent] = useState("products");

  return (
    <AdminSidebarContext.Provider value={{selectedContent, setSelectedContent}}>
      <div>
        <div className="flex">
            <SideBarAdmin />
            { selectedContent === "products" && <ProductsList />}
            { selectedContent === "categories" && <CategoriesList />}
            { selectedContent === "histories" && <HistoriesList />}
        </div>
      </div>
    </AdminSidebarContext.Provider>

  );
}
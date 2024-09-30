"use client"

import React, { useState } from "react";
import SideBarAdmin from "./components/SidebarAdmin";
import Dashboard from "../dashboard/page";
import SalesList from "./sales/page";
import HistoriesList from "./histories/page";
import ProductsList from "./products/page";
import CategoriesList from "./categories/page";
import BoardgamesList from "./boardgames/page";
import UsersList from "./users/page";
import { AdminSidebarContext } from "@/utils/contexts";

export default function Admin() {
  const [selectedContent, setSelectedContent] = useState("dashboard");

  return (
    <AdminSidebarContext.Provider value={{selectedContent, setSelectedContent}}>
      <div>
        <div className="flex">
            <SideBarAdmin />
              { selectedContent === "dashboard" && <Dashboard />}
              { selectedContent === "sales" && <SalesList />}
              { selectedContent === "histories" && <HistoriesList />}
              { selectedContent === "products" && <ProductsList />}
              { selectedContent === "categories" && <CategoriesList />}
              { selectedContent === "boardgames" && <BoardgamesList />}
              { selectedContent === "users" && <UsersList />}
        </div>
      </div>
    </AdminSidebarContext.Provider>
  );
}
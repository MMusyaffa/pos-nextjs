import React, { useContext } from "react";
import Link from 'next/link'
import { AdminSidebarContext } from "@/utils/contexts";

export default function SideBarAdmin() {

    const {selectedContent, setSelectedContent} = useContext(AdminSidebarContext)

    const isActive = (name) => selectedContent === name;

    return (
        <div className="fixed h-screen flex flex-col justify-between border-r bg-white">
            <div className="px-4 py-6">
                <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    <img src="/products/dhadhu-logo.png" className="w-25 h-15"></img>
                </span>

            <ul className="mt-6 space-y-1">

            <li>
                <a
                    href="#" onClick={() => setSelectedContent("products")}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                        isActive("products") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                    > Menus
                </a>
            </li>
            
            <li>
                <a
                    href="#" onClick={() => setSelectedContent("categories")}
                        className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                            isActive("categories") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                    > Categories
                </a>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        href="#"
                            className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${
                                isActive("teams") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            }`}
                            onClick={() => setSelectedContent("teams")}
                    >
                        <span className="text-sm font-medium"> Teams </span>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            > Calendar
                            </a>
                        </li>
                    </ul>
                </details>
            </li>

            <li>
                <a
                    href="#"
                    onClick={() => setSelectedContent("history")}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                        isActive("history") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                > History
                </a>
            </li>

            <li>
                <a
                    href="#"
                    onClick={() => setSelectedContent("invoices")}
                    className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                        isActive("invoices") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                > Invoices
                </a>
            </li>

            <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary
                        className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 ${
                            isActive("account") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        onClick={() => setSelectedContent("account")}
                    >
                        <span className="text-sm font-medium"> Account </span>
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </span>
                    </summary>

                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <a
                                href="#"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                Setting
                            </a>
                        </li>

                        <li>
                            <form action="#">
                                <button
                                    type="submit"
                                    className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                >
                                    Logout
                                </button>
                            </form>
                        </li>
                    </ul>
                </details>
            </li>
            </ul>
            </div>
        </div>
    )
}

import React, { useContext } from "react";
import { AdminSidebarContext } from "@/utils/contexts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SideBarAdmin() {
    const {selectedContent, setSelectedContent} = useContext(AdminSidebarContext)

    const isActive = (name) => selectedContent === name;

    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();

        router.push("/authentication/login");
    };

    return (
        <div className="fixed h-screen flex flex-col justify-between border-r bg-white">
            <div className="px-4 py-6">
                <span className="grid h-10 w-36 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                    <img src="/products/dhadhu-logo.png" className="w-25 h-15"></img>
                </span>
                <ul className="mt-6 space-y-1">
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("dashboard")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("dashboard") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("sales")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("sales") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Sales
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("histories")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("histories") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > History
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("products")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("products") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Menus
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("categories")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("categories") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#" onClick={() => setSelectedContent("boardgames")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("boardgames") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Board Games
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="#"
                            onClick={() => setSelectedContent("users")}
                            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                isActive("users") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                            > Users
                        </Link>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-sm font-medium"> Setting </span>
                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"/>
                                        </svg>
                                    </span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link
                                        href="#" onClick={() => setSelectedContent("settings")}
                                        className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                                            isActive("settings") ? "bg-gray-100 text-gray-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            }`}                            
                                        > Account
                                    </Link>
                                </li>
                                <li>
                                    <form onSubmit={(e) => handleLogout(e)}>
                                        <button
                                            type="submit"
                                            className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                            > Logout
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

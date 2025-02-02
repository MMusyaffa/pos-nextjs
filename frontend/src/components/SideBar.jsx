import SwitchButtonSideBar from "./SwitchButtonSideBar";
import { useState } from "react";
import Link from "next/link";

export default function SideBar() {
    const [sideBarIsVisible, setSideBarIsVisible] = useState(true);
    const [activeItem, setActiveItem] = useState("Home"); // Default active item

    const handleItemClick = (itemName) => {
        setActiveItem(itemName); // Set item yang diklik menjadi aktif
    };

    return (
        <>
            <div className={`${sideBarIsVisible ? 'col-span-2' :'col-span-1'} rounded-tr-md rounded-br-md transition-all duration-500 bg-[#2d2d2d] ${sideBarIsVisible ? '-translate-x-0' : '-translate-x-[1rem]'} duration-200 relative p-4`}>
                <div className={`flex flex-col justify-between h-[680px] text-xs text-stone-100 font-bold ${sideBarIsVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col space-y-4 items-center">

                        {/* Menu Button */}
                        <Link href="/" onClick={() => handleItemClick("Menu")} 
                            className={`flex flex-col space-y-1 items-center p-4 rounded-lg transition hover:opacity-80 
                            ${activeItem === "Menu" ? "bg-[#E06F2C] text-white" : "hover:bg-[#AC511B]"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                            </svg>
                            <span>Menu</span>
                        </Link>

                        {/* Board Games Button */}
                        <Link href="#" onClick={() => handleItemClick("Boardgames")} 
                            className={`flex flex-col space-y-1 items-center p-4 rounded-lg transition hover:opacity-80 
                            ${activeItem === "Boardgames" ? "bg-[#E06F2C] text-white" : "hover:bg-[#AC511B]"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="3" y="3" width="8" height="8" rx="2" ry="2" stroke="currentColor"/>
                                <circle cx="7" cy="7" r="0.8" fill="currentColor"/><circle cx="5" cy="5" r="0.8" fill="currentColor"/><circle cx="9" cy="9" r="0.8" fill="currentColor"/><rect x="13" y="13" width="8" height="8" rx="2" ry="2" stroke="currentColor"/>
                                <circle cx="17" cy="15" r="0.8" fill="currentColor"/><circle cx="15" cy="17" r="0.8" fill="currentColor"/><circle cx="19" cy="19" r="0.8" fill="currentColor"/><circle cx="17" cy="17" r="0.8" fill="currentColor"/>
                            </svg>
                            <span>Boardgames</span>
                        </Link>

                        {/* History Button */}
                        <Link href="#" onClick={() => handleItemClick("History")} 
                            className={`flex flex-col space-y-1 items-center p-4 rounded-lg transition hover:opacity-80 
                            ${activeItem === "History" ? "bg-[#E06F2C] text-white" : "hover:bg-[#AC511B]"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                            <span>History</span>
                        </Link>

                        {/* Settings Button */}
                        <Link href="#" onClick={() => handleItemClick("Setting")} 
                            className={`flex flex-col space-y-1 items-center p-4 rounded-lg transition hover:opacity-80 
                            ${activeItem === "Setting" ? "bg-[#E06F2C] text-white" : "hover:bg-[#AC511B]"}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Setting</span>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    );
}

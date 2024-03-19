import { SeacrhProductContext } from "@/utils/contexts";
import { useContext } from "react";

export default function NavBar() {

    const {searchProduct, setSearchProduct} = useContext(SeacrhProductContext)

    return (
        <>
            <div className="flex flex-col p-2 space-y-2 bg-[#1f2125]">
                <div className="flex items-center space-x-20">
                    <div className="flex space-x-2 items-center">
                        <img src="/products/dhadhu-logo.png" className="w-20 h-10" alt="logo" />    
                    </div>
                    <div className="flex space-x-2 items-center font-bold">
                        <span>Welcome to Dhadhu Board Game Cafe</span>         
                    </div>
                    <div className="flex justify-between flex-grow">
                        <div className="flex h-10 w-full rounded-lg bg-[#2d2d2d] p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            <input className="focus:outline-none p-2 bg-[#2d2d2d] h-full w-full text-xs z-10" placeholder="Search menu here" onChange={e => setSearchProduct(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

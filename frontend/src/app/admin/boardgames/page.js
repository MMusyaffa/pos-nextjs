"use client"

import { useEffect, useState } from "react";
import { getBoardgame } from "@/api/boardgames"
import NavbarAdmin from "../components/Navbar";
import AddBoardgames from "./addBoardgames";
import DeleteBoardgames from "./deleteBoardgames";
import UpdateBoardgames from "./updateBoardgames";

export default function BoardgamesList() {

    //const categories = await getCategories();
    const [getBoardgames, setGetBoardGames] = useState([]);
    
    useEffect(()=> {
        getBoardgame()
            .then(res => setGetBoardGames(res))
    }, []);
    

    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddBoardgames/>
            </div>
            <table className="table ml-56 mt-5 mb-10 w-10/12">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getBoardgames.map((boardgames, index) => 
                    (
                        <tr key = {boardgames.id}>
                            <td>
                                {index + 1}
                                </td>
                            <td>
                                <img src={boardgames.image_url} style={{ maxWidth: '100px' }}/>
                            </td>
                            <td>
                                {boardgames.name}
                            </td>
                            <td>
                                {boardgames.category}
                            </td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateBoardgames {...boardgames}/>
                                </div>
                                    <DeleteBoardgames {...boardgames}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
"use client"

import { useEffect, useState } from "react";
import { getCategory } from "@/api/categories";
import NavbarAdmin from "../components/Navbar";
import AddCategories from "./addCategories";
import DeleteCategories from "./deleteCategories";
import UpdateCategories from "./updateCategories";

// export const metadata = {
//   title: "Categories List",
// };

export default function CategoriesList() {

    //const categories = await getCategories();
    const [getCategories, setGetCategories] = useState([]);
    
    useEffect(()=> {
        getCategory()
            .then(res => setGetCategories(res))
    }, []);
    

    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddCategories/>
            </div>
            <table className="table ml-56 mt-5 mb-10 w-10/12">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Categories Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                
                <tbody>
                    {getCategories.map((categories, index) => 
                    (
                        <tr key = {categories.id}>
                            <td>
                                {index + 1}
                                </td>
                            <td>
                                <img src={categories.image_url} style={{ maxWidth: '100px' }}/>
                            </td>
                            <td>
                                {categories.name}
                            </td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateCategories {...categories}/>
                                </div>
                                    <DeleteCategories {...categories}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
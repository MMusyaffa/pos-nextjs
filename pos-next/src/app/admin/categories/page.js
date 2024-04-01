"use client"

import { useEffect, useState } from "react";
import AddCategories from "./addCategories";
import DeleteCategories from "./deleteCategories";
import UpdateCategories from "./updateCategories";

// export const metadata = {
//   title: "Categories List",
// };

async function fetchCategories()
{
    const res = await fetch ("http://localhost:4000/categories", {
        cache: 'no-store', //untuk mengambil data pada setiap request
    });

    return res.json();
}

export default function CategoriesList() {

    //const categories = await getCategories();
    const [getCategories, setGetCategories] = useState([]);
    
    useEffect(()=> {
        fetchCategories()
            .then( function (res) {setGetCategories(res)
            })

    }, []);
    

    return (
            <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard Categories</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
                <div className="py-2 pt-8">
                    <AddCategories/>
                </div>
                
                <table className="table w-full">
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
                                    <img src={categories.image} style={{ maxWidth: '100px' }}/>
                                </td>
                                <td>
                                    {categories.title}
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
"use client"

import { useEffect, useState } from "react";
import { getCategories } from "@/api/categories";
import AddCategory from "./addCategories";
import DeleteCategory from "./deleteCategories";
import UpdateCategory from "./updateCategories";

export default function CategoriesList() {

    const [categories, setCategories] = useState([]);
    const [changes, setChanges] = useState(0);

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res))
    }, [changes]);


    return (
        <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard Categories</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
            <div className="py-2 pt-8">
                <AddCategory setChanges={setChanges} />
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
                    {categories && categories.map((category, index) =>
                    (
                        <tr key={category.id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <img src={category.image_url} style={{ maxWidth: '100px' }} />
                            </td>
                            <td>
                                {category.name}
                            </td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateCategory category={category} setChanges={setChanges} />
                                </div>
                                <DeleteCategory setChanges={setChanges} category={category} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
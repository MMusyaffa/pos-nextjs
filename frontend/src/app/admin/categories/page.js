"use client"

import { useEffect, useState } from "react";
import NavbarAdmin from "../components/Navbar";
import { getCategories } from "@/api/categories";
import AddCategory from "./addCategories";
import DeleteCategory from "./deleteCategories";
import UpdateCategory from "./updateCategories";

// export const metadata = {
//   title: "Categories List",
// };


export default function CategoriesList() {

    const [categories, setCategories] = useState([]);
    const [changes, setChanges] = useState(0);

    useEffect(() => {
        getCategories()
            .then(res => setCategories(res))
    }, [changes]);


    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddCategory setChanges={setChanges} />
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
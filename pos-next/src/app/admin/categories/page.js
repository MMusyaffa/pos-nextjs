"use client"

import { useEffect, useState } from "react";
import AddCategories from "./addCategories";
import DeleteCategories from "./deleteCategories";
import UpdateCategories from "./updateCategories";

import dummyData from "../../../data/dummy.json";


async function fetchCategories() {
    if (process.env.USE_MOCK) {
        // todo: fetch from backend
    }
    else {
        return dummyData.data.categories;
    }
}

export default function CategoriesList() {

    //const categories = await getCategories();
    const [getCategories, setGetCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then(function (res) {
                setGetCategories(res)
            })

    }, []);


    return (
        <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard Categories</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
            <div className="py-2 pt-8">
                <AddCategories />
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
                        <tr key={categories.id}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                <img src={categories.image} style={{ maxWidth: '100px' }} />
                            </td>
                            <td>
                                {categories.name}
                            </td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateCategories {...categories} />
                                </div>
                                <DeleteCategories {...categories} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
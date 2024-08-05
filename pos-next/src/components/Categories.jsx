// import { CategoriesDatas } from "../Api/CategoriesDatas";
import CategoryButton from "./CategoryButton";

import dummyData from "../data/dummy.json";
import { useEffect, useState } from "react";

async function fetchCategories() {
    if (process.env.USE_MOCK) {
        // todo: fetch from backend
    }
    else {
        return dummyData.data.categories;
    }
}

export default function Categories() {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        setCategories(null)
        fetchCategories()
            .then(function (res) {
                setCategories(res);
            });
    }, []) 

    return (
        <>
            <div className="flex justify-between w-full overflow-x-auto mt-4 p-2">
                { categories && categories.map((category) => <CategoryButton category={category} key={category.id} />) }
            </div>
        </>
    );
}
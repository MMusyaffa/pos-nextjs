import { useEffect, useState } from "react";
import CategoryButton from "./CategoryButton";
import data from "@/utils/data";

export default function Categories() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function fetch() {
            setCategories(await data.fetchCategories())
        }
        fetch()
    }, [])

    return (
        <>
            <div className="flex gap-3 w-full overflow-x-auto mt-4 p-2">
                { categories && categories.map((category) => <CategoryButton category={category} key={category.Name} />) }
            </div>
        </>
    );
}
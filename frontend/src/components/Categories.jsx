import { getCategories } from "@/api/categories";
import CategoryButton from "./CategoryButton";
import { useEffect, useState } from "react";

export default function Categories() {
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((data) => setCategories(data));
    }, []);

    return (
        <div className="flex justify-between w-full overflow-x-auto mt-4 p-2">
            <div className="flex justify-between w-full overflow-x-auto mt-4 p-2">
                { categories.length > 0 
                    ? categories.map((category) => <CategoryButton category={category} key={category.id} />)
                    : <p>No categories available</p> // Placeholder jika data kategori belum ada atau kosong
                }
            </div>
        </div>
    );
}

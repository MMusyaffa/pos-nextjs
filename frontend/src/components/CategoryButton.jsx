import { useContext } from "react";
import { IdCurrentCategoryContext } from "../utils/contexts";

export default function CategoryButton({category}) {
    const {idCurrentCategory, setIdCurrentCategory} = useContext(IdCurrentCategoryContext)

    return (
        <>
            <a href="#" onClick={() => setIdCurrentCategory(category.id)} 
                className={`flex flex-none space-x-2 border-2 transition duration-500 ${idCurrentCategory === category.id ? ' border-red-200 bg-red-500/30': 'border-stone-800'} px-3 py-2 rounded-lg hover:opacity-60`}
                >
                <img 
                    src={category.image_url || "/categories/categoryIcon.svg"} 
                    className="w-6 h-6" 
                    alt="Category Icon" 
/>
                <div>
                    {category.name}
                </div>
            </a>
        </>
    );
}
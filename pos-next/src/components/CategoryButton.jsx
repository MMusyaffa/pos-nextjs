import { useContext } from "react";
import { IdCurrentCategoryContext } from "../utils/contexts";

export default function CategoryButton({category}) {
    const {idCurrentCategory, setIdCurrentCategory} = useContext(IdCurrentCategoryContext)

    return (
        <>
            <div onClick={() => setIdCurrentCategory(category.Name)} 
                className={`flex flex-none space-x-2 border-2 transition duration-500  ${idCurrentCategory === category.Name ? ' border-red-200 bg-red-500/30': 'border-stone-800'} px-3 py-2 rounded-lg hover:opacity-60`}
                >
                {/* Using static image temporary */}
                {category.ImageUrl.Valid && <img src={category.ImageUrl.String} alt={category.Name} className="w-10 h-10 rounded-full" />}
                <div>{category.Name}</div>
            </div>
        </>
    );
}
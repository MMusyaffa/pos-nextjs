import CategoryButton from "./CategoryButton";

import dummyData from "../data/dummy.json"

export default function Categories() {
    const categoriesData = dummyData.data.categories;
    return (
        <>
            <div className="flex justify-between w-full overflow-x-auto mt-4 p-2">
                { categoriesData.map((category) => <CategoryButton category={category} key={category.id} />) }
            </div>
        </>
    );
}
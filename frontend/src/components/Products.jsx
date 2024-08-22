
import { useContext, useEffect, useState } from "react";
import { IdCurrentCategoryContext } from "../utils/contexts";
import { sleep } from "../utils/helpers";
import ProductItem from "./ProductItem";

import dummyData from "../data/dummy.json"

export default function Products() {
    const productData = dummyData.data.products;
    const {idCurrentCategory} = useContext(IdCurrentCategoryContext)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        async function filterProduct(idCurrentCategory) {
            setProducts(null)
            let fiteredProducts = productData.filter((product) => product.category_id === idCurrentCategory)
            await sleep(500)
            setProducts(fiteredProducts)
        }

        filterProduct(idCurrentCategory)
    }, [idCurrentCategory]) 

   
    return (
        <>
            <div className={`grid grid-cols-2 gap-2 max-h-[900px] overflow-auto mr-2  transition-all duration-1000 ${products ? 'opacity-100': 'opacity-0'}`}>
                {products && products.map((product)=> <ProductItem productProps={product} key={product.id} />) }
            </div>
        </>
    );
}
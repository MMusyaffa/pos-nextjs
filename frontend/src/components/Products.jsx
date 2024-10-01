
import { useContext, useEffect, useState } from "react";
import { IdCurrentCategoryContext } from "../utils/contexts";
import { sleep } from "../utils/helpers";

import ProductItem from "./ProductItem";

import { getProducts } from "@/api/products";
import { getCategories } from "@/api/categories";

export default function Products() {
    const {idCurrentCategory, setIdCurrentCategory} = useContext(IdCurrentCategoryContext)
    const [products, setProducts] = useState(null)

    // get the first category id
    // and set it as the current category
    useEffect(() => {
        getCategories().then((data) => {
            if (data.length > 0) {
                setIdCurrentCategory(data[0].id)
            }
        });
    }, [])


    // update products when the current category changes
    useEffect(() => {
        async function filterProduct(idCurrentCategory) {
            setProducts(null)
            try {
                // get all products
                let filteredProducts = await getProducts();
                
                // filter products by category
                filteredProducts = filteredProducts.filter((product) => product.category_id === idCurrentCategory)
                filteredProducts = filteredProducts.map((product) => ({
                    ...product,
                    devise: "$",
                    available: "Not implemented",
                }))

                await sleep(500)
                setProducts(filteredProducts)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        filterProduct(idCurrentCategory);
        
    }, [idCurrentCategory]) 

   
    return (
        <>
            <div className={`grid grid-cols-2 gap-2 max-h-[900px] overflow-auto mr-2  transition-all duration-1000 
                ${products ? 'opacity-100': 'opacity-0'}`}>
                {products && products.map((product)=> 
                <ProductItem productProps={product} key={product.id} />) }
            </div>
        </>
    );
}
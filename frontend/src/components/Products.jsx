
import { useContext, useEffect, useState } from "react";
import { IdCurrentCategoryContext } from "../utils/contexts";
import { sleep } from "../utils/helpers";
import { getProduct } from "@/api/products";
import ProductItem from "./ProductItem";

export default function Products() {
    const {idCurrentCategory} = useContext(IdCurrentCategoryContext)
    const [products, setProducts] = useState(null)

    useEffect(() => {
        async function filterProduct(idCurrentCategory) {
            setProducts(null)
            
            try{
                const Products = await getProduct();
                const fiteredProducts = Products.filter(
                    (product) => product.category_id === idCurrentCategory
                );
                await sleep(500);
                setProducts(fiteredProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        filterProduct(idCurrentCategory)
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
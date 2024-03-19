
import { useContext, useEffect, useState } from "react";
import { ErrorContext, IdCurrentCategoryContext, SeacrhProductContext } from "../utils/contexts";
import ProductItem from "./ProductItem";
import data from "@/utils/data";

export default function Products(props) {
    const {idCurrentCategory} = useContext(IdCurrentCategoryContext)
    const {searchProduct} = useContext(SeacrhProductContext)
    const [products, setProducts] = useState(null)
    const {error, setError} = useContext(ErrorContext)

    useEffect(() => {
        async function filterProduct(searchProduct, idCurrentCategory) {
            // setProducts(null)
            const items = await data.fetchItems({name: searchProduct, category: idCurrentCategory})
            // let fiteredProducts = items.filter((product) => product.Category === idCurrentCategory)
            // await sleep(100)
            setProducts(items)

            if (items === null){
                setError(true)
            }
        }

        filterProduct(searchProduct, idCurrentCategory)
    }, [idCurrentCategory, searchProduct]) 

   
    return (
        <>
            <div className={`grid grid-cols-2 gap-2 max-h-[600px] overflow-auto mr-2  transition-all duration-1000 ${products ? 'opacity-100': 'opacity-0'}`}>
                {products && products.map((product)=> <ProductItem productProps={product} key={product.ID} />) }
            </div>
        </>
    );
}
"use client"

import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import { formatRupiah } from "@/utils/utils";

export default function ProductsList() {

    const [products, setProducts] = useState([]);
    const [changes, setChanges] = useState(0);

    useEffect(() => {
        getProducts()
            .then(function (tit) {
                setProducts(tit)
            })
    }, [changes]);

    return (
        // <div className="flex">
        //     <SideBarAdmin />

        <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
            <div className="py-2 pt-8">
                <AddProduct setChanges={setChanges} />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>stock</th>
                        <th>Categories</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => {
                        return (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img src={product.image_url} style={{ maxWidth: '90px' }} />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>Not implemented</td>
                                <td>{product.category_name}</td>
                                <td>{formatRupiah(product.price.toString(), 'Rp')}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        <UpdateProduct product={product} setChanges={setChanges} />
                                    </div>
                                    <DeleteProduct product={product} setChanges={setChanges} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        //</div>
    );
} 
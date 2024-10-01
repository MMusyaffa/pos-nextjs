"use client"

import { useEffect, useState } from "react";
import NavbarAdmin from "../components/Navbar";
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
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddProduct setChanges={setChanges} />
            </div>
            <table className="table ml-56 mt-5 mb-10 w-10/12">
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
    );
} 
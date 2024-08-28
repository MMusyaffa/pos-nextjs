"use client"

import { useEffect, useState } from "react";
import { getProduct } from "@/api/products";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

import dummyData from "../../../data/dummy.json";

// export const metadata = {
//     title: "Product List",
//   };

const categories = dummyData.data.categories;

const formatRupiah = (angka, prefix) => {

        var number_string = angka.replace(/[^,\d]/g, '').toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? 'Rp' + rupiah : '';
    }

export default function ProductsList() 
{
    // const products = await getProducts();
    const [getProducts, setGetProducts] = useState([]);

    useEffect(()=> {
        getProduct()
            .then( function (tit) {setGetProducts(tit)
            })

    }, []);
    
    return (
        // <div className="flex">
        //     <SideBarAdmin />

            <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
                <div className="py-2 pt-8">
                    <AddProduct/>
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
                        {getProducts.map((product, index) => {
                            const categoryName = categories.find(category => category.id === product.category_id)?.name;

                            return (
                                <tr key = {product.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={product.image_url} style={{ maxWidth: '90px' }}/>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.available}</td>
                                    <td>{categoryName}</td>
                                    <td>{formatRupiah(product.price.toString(), 'Rp')}</td>
                                    <td className="flex">
                                        <div className="mr-1">
                                            <UpdateProduct {...product}/>
                                        </div>
                                            <DeleteProduct {...product}/>
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
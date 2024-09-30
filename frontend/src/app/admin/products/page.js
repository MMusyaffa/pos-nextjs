"use client"

import { useEffect, useState } from "react";
import { getProduct } from "@/api/products";
import { getCategory } from "@/api/categories";
import NavbarAdmin from "../components/Navbar";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

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
    const [getProducts, setGetProducts] = useState([]);
    const [getCategories, setGetCategories] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            try {
                // Gunakan Promise.all untuk menunggu kedua API selesai
                const [productsData, categoriesData] = await Promise.all([getProduct(), getCategory()]);
                
                setGetProducts(productsData);  // Set hasil produk
                setGetCategories(categoriesData);  // Set hasil kategori
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

    }, []);
    
    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddProduct/>
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
                    {getProducts.map((product, index) => {
                        const categoryName = getCategories.find(category => category.id === product.category_id)?.name;

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
    );
} 
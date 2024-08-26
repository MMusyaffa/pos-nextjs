"use client"

import { useEffect, useState } from "react";
// import AddProduct from "./addProduct";
// import DeleteProduct from "./deleteProduct";
// import UpdateProduct from "./updateProduct";

import dummyHistories from "../../../data/dummyHistory.json";

// export const metadata = {
//     title: "Product List",
//   };

const usingDummyData = true;

async function fetchHistories()
{
    if (usingDummyData) {
        return dummyHistories.history.productSale;
    }
    else {
        return null;
    }
}

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

export default function HistoriesList() 
{
    // const products = await getProducts();
    const [getHistories, setGetHistories] = useState([]);

    useEffect(()=> {
        fetchHistories()
            .then( function (tit) {setGetHistories(tit)
            })

    }, []);
    
    return (
        // <div className="flex">
        //     <SideBarAdmin />

            <div className="py-3 px-10 w-full ml-36">
            <h2 className="text-3xl font-bold sm:text-4l">Dhadhu Caffee Dashboard</h2>
            <h2 className="py-4 text-l font-medium">Welcome Admin 1 </h2>
                <div className="py-2 pt-8">
                    {/* <AddProduct/> */}
                </div>
                
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Categories</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getHistories.map((history, index) => 
                        (
                            <tr key = {history.id}>
                                <td>{index + 1}</td>
                                <td>{history.date}</td>
                                <td>{history.order_id}</td>
                                <td>{history.employee}</td>
                                <td>{formatRupiah(history.price.toString(), 'Rp')}</td>
                                <td className="flex">
                                    <div className="mr-1">
                                        {/* <UpdateProduct {...product}/> */}
                                    </div>
                                        {/* <DeleteProduct {...product}/> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        //</div>
    );
} 
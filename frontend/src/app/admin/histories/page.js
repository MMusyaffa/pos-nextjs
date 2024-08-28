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
                            <th>Date</th>
                            <th>Order ID</th>
                            <th>Employee</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Notes</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getHistories.map((history, index) => 
                        (
                            <tr key = {history.order_id}>
                                <td>{history.date}</td>
                                <td>{history.order_id}</td>
                                <td>{history.employee}</td>
                                <td>{history.customer}</td>
                                <td>{history.product}</td>
                                <td>{history.qty}</td>
                                <td>{history.description}</td>
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
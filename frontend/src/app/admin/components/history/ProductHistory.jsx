import React, { useEffect, useState } from 'react';
import { getHistory } from '@/api/history';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function convertToMySQLDate(numericDate) {
    const dateString = numericDate.toString();
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
}

export default function HistoryProduct() {
    const [getHistories, setGetHistories] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to today's date

    useEffect(() => {
        getHistory().then((histories) => {
            const convertedHistories = histories.map((history) => ({
                ...history,
                date: convertToMySQLDate(history.date),
            }));
            setGetHistories(convertedHistories);
        });
    }, []);

    const filteredHistories = getHistories.filter((history) => {
        const historyDate = format(new Date(history.date), 'yyyy-MM-dd');
        const selectedFormattedDate = format(selectedDate, 'yyyy-MM-dd');
        return historyDate === selectedFormattedDate;
    });

    return (
        <div className="card bg-base-100 shadow-md p-4 ml-56 mr-10 mt-10 mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="card-title ml-4">History Sales</h2>
                <div className="flex cursor-pointer mt-5">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="input input-bordered"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full mt-4">
                    <thead>
                        <tr>
                            <th className="text-sm font-semibold">Date</th>
                            <th className="text-sm font-semibold">Order ID</th>
                            <th className="text-sm font-semibold">Employee</th>
                            <th className="text-sm font-semibold">Customer</th>
                            <th className="text-sm font-semibold">Product</th>
                            <th className="text-sm font-semibold">Qty</th>
                            <th className="text-sm font-semibold">Notes</th>
                            <th className="text-sm font-semibold">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistories.length > 0 ? (
                            filteredHistories.map((history) => (
                                <tr key={history.id}>
                                    <td>{history.date}</td>
                                    <td>{history.order_id}</td>
                                    <td>{history.employee}</td>
                                    <td>{history.customer}</td>
                                    <td>{history.product}</td>
                                    <td>{history.qty}</td>
                                    <td>{history.description}</td>
                                    <td>{history.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', 
                                        minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No history found for this date.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

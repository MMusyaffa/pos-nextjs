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

export default function HistoryBoardgame() {
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
        return historyDate === selectedFormattedDate &&
                history.game_board && history.game_board_qty > 0;
    });

    return (
        <div className="card bg-base-100 shadow-md p-4 ml-56 mr-10 mt-12 mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="card-title ml-4 mt-5">Board Game Played</h2>
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
                            <th className="text-sm font-semibold">No</th>
                            <th className="text-sm font-semibold">Customer</th>
                            <th className="text-sm font-semibold">Board Game Name</th>
                            <th className="text-sm font-semibold">Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistories.length > 0 ? (
                            filteredHistories.map((history) => (
                                <tr key={history.id}>
                                    <td className="text-sm font-medium">{history.date}</td>
                                    <td className="text-sm font-medium">{history.customer}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-semibold">{history.game_board}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-sm">{history.game_board_qty || 0}</td>
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
};

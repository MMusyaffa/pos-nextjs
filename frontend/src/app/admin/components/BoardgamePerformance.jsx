import React, { useEffect, useState } from 'react';
import { getBoardgame } from '@/api/boardgames';
import { getHistory } from '@/api/history';

const calculateTotals = (sales, month, year) => {
    const totals = {};

    const filteredSales = sales.filter((sale) => {
        const saleDate = String(sale.date);
        const saleYear = parseInt(saleDate.substring(0, 4), 10);
        const saleMonth = parseInt(saleDate.substring(4, 6), 10);
        return saleYear === year && saleMonth === month;
    });

    filteredSales.forEach((sale) => {
        if (!totals[sale.game_board]) {
            totals[sale.game_board] = { game_board_qty: 0 };
        }
        totals[sale.game_board].game_board_qty += sale.game_board_qty;
    });

    return totals;
};

export default function BoardgamePerformance() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [boardgames, setBoardgames] = useState([]);
    const [sales, setSales] = useState([])
    const [month, setMonth] = useState(currentMonth); 
    const [year, setYear] = useState(currentYear);

    useEffect(() => {
        async function fetchData() {
            const [boardgameData, salesData] = await Promise.all([getBoardgame(), getHistory()]);
            
            setBoardgames(boardgameData);
            setSales(salesData);
        }

        fetchData();
    }, []);

    const totals = calculateTotals(sales, month, year);

    const sortedGameProducts = boardgames.sort((a, b) => {
        const qtyA = totals[a.name]?.game_board_qty || 0;
        const qtyB = totals[b.name]?.game_board_qty || 0;
        return qtyB - qtyA;
    });

    return (
        <div className="card bg-base-100 shadow-md p-4 ml-56 mt-12 mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="card-title ml-4 mt-5">Board Game Played</h2>
                <div className="flex gap-2 mt-5">
                    <select
                        className="select select-bordered select-sm"
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                    >
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                    </select>
                    <select
                        className="select select-bordered select-sm"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        >
                        <option value={2023}>2023</option>
                        <option value={2024}>2024</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full mt-4">
                    <thead>
                        <tr>
                            <th className="text-sm font-semibold">Date</th>
                            <th className="text-sm font-semibold">Board Game Name</th>
                            <th className="text-sm font-semibold">Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedGameProducts.map((game_board, index) => (
                            <tr key={game_board.id}>
                                <td className="text-sm font-medium">{index + 1}</td>
                                <td>
                                    <div className="flex items-center">
                                        <div>
                                            <div className="text-sm font-semibold">{game_board.name}</div>
                                            <div className="text-xs text-gray-500">{game_board.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-sm">{totals[game_board.name]?.game_board_qty || 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

import { useState, useEffect } from "react";
import CategoryButton from "./CategoryButton";
import { getCategory } from "@/api/categories"; // Mengimpor getCategory dari API

export default function Categories() {
    const [categoriesData, setCategoriesData] = useState([]); // State untuk menyimpan data kategori

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategory(); // Mengambil data kategori dari API
                setCategoriesData(data); // Menyimpan data kategori ke dalam state
            } catch (error) {
                console.error("Error fetching categories:", error); // Menangani error jika gagal mengambil data
            }
        }

        fetchCategories(); // Memanggil fungsi fetchCategories untuk mengambil data saat komponen pertama kali di-render
    }, []); // Hanya dijalankan sekali setelah komponen di-mount

    return (
        <div className="flex justify-between w-full overflow-x-auto mt-4 p-2">
            {categoriesData.length > 0 ? (
                categoriesData.map((category) => <CategoryButton category={category} key={category.id} />)
            ) : (
                <p>No categories available</p> // Placeholder jika data kategori belum ada atau kosong
            )}
        </div>
    );
}

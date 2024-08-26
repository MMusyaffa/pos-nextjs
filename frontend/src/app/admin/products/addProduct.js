"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {

    const [image_url, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState("");
    const [category_id, setCategories] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    async function handleSubmit(e)
    {
        e.preventDefault();

        setIsMutating(true);

        await fetch ("http://localhost:5000/products",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    name: name,
                    price: price,
                    description: description,
                    category_id: category_id,
                    image_url: image_url,
                })
        });

        setIsMutating(false);

        setName("");
        setPrice("");
        setDescription("");
        router.refresh();
        setModal(false);
    }

    function handleChange()
    {
        setModal(!modal);
    }

  return (
   <div>
        <button className="btn" onClick={handleChange}>
            Add
        </button>
    <input 
        type="checkbox" 
        checked={modal} 
        onChange={handleChange} 
        className="modal-toggle"
    />

        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Add New product
                </h3>

                <form onSubmit={handleSubmit}>
                    
                    <div className="form-control">
                        <label className="label font-bold">
                            Product Image
                        </label>

                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="input w-full input-bordered"
                        />
                        <p className="mt-2">
                            Or Input Image URL
                        </p>

                        <input 
                            type="text"
                            value={image_url}
                            onChange={(e) => setImage(e.target.value)}
                            className="input w-full input-bordered mt-2.5"
                            placeholder="Enter Image URL"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Product name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Product name"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Description"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Stock
                        </label>
                        <input
                            type="number"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                            min="0"
                            className="input w-full input-bordered"
                            placeholder="Enter Stock Available"
                        />
                    </div>

                    <div className="form-control mt-3 ">
                        <label className="label font-bold">
                            Category
                        </label>
                        <div className="flex items-center relative">
                        
                            <select 
                                value={category_id} 
                                onChange={(e) => setCategories(e.target.value)}
                                className="input w-full input-bordered pr-8">

                                    <option value="">Select Category</option>
                                    <option value="1">Makanan</option>
                                    <option value="2">Minuman</option>
                                    <option value="3">Snack</option>
                                    <option value="4">Ice Cream</option>
                            </select>

                            <div className="pointer-events-none flex items-center absolute inset-y-0 right-0 pr-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                                    />
                                </svg>
                            </div>

                        </div>
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Price
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            min="0"
                            className="input w-full input-bordered"
                            placeholder="Enter Price"
                        />
                    </div>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button type="submit" className="btn btn-primary">
                            Save
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                            Saving...
                            </button>
                        )}
                    </div>

                </form>
            </div>
        </div>
   </div>
  );
}

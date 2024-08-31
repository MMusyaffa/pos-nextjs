"use client"

import { useEffect, useRef, useState } from "react";
import { updateProduct } from "@/api/products";
import { uploadFile } from "@/api/uploads";
import { getCategories } from "@/api/categories";

export default function UpdateProduct({ product, setChanges }) {

    const [image_url, setImageUrl] = useState("");
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [description, setDescription] = useState(product.description);
    const [available, setAvailable] = useState(product.available);
    const [category_id, setCategoryId] = useState(product.category_id);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    // image upload id from the server
    const [imageUploadId, setImageUploadId] = useState(null);

    // reference html input file
    const refUploadFile = useRef(null);

    // categories
    const [categories, setCategories] = useState([]);

    // Add image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        try {
            const id = await uploadFile(file)
            setImageUploadId(id);
            setImageUrl("");
        } catch (error) {
            // TODO: Handle if upload file error
            refUploadFile.current.value = "";
        }
    };

    // reset form
    const resetForm = () => {
        setImageUrl("");
        setImageUploadId(null);
        refUploadFile.current.value = "";
    }

    function handleBeforeSubmit(e) {
        e.preventDefault();
        setIsMutating(true);
    }

    function handleAfterSubmit() {
        resetForm();
        setIsMutating(false);
        setModal(false);
        setChanges((prev) => prev + 1);
    }

    const handleSubmit = async (e) => {
        handleBeforeSubmit(e);

        const updatedProduct = {
            name: name,
            description: description,
            price: price,
            category_id: category_id,
            image_url: image_url,
            upload_id: imageUploadId,
        }

        try {
            await updateProduct(product.id, updatedProduct);
        } catch (error) {
            // TODO: Handle if update product error
        }

        handleAfterSubmit();
    }

    function handleChange() {
        getCategories().then((data) => setCategories(data));
        setModal(!modal);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleChange}>
                Edit
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
                        Edit product {product.name}
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="form-control mt-3">
                            <label className="label font-bold">
                                Product Image
                            </label>

                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="input w-full input-bordered"
                                ref={refUploadFile}
                            />
                            <p className="mt-2">
                                Or Input Image URL
                            </p>

                            <input
                                type="url"
                                value={image_url}
                                onChange={(e) => setImageUrl(e.target.value)}
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
                                Product description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Enter Product description"
                            />
                        </div>

                        <div className="form-control mt-3">
                            <label className="label font-bold">
                                Product available
                            </label>
                            <input
                                type="number"
                                value={available}
                                onChange={(e) => setAvailable(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Enter Product description"
                            />
                        </div>

                        <div className="form-control mt-3">
                            <label className="label font-bold">
                                Categories
                            </label>
                            <div className="flex items-center relative">

                                <select
                                    value={category_id}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="input w-full input-bordered pr-8">

                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}

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
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
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
                                    Edit
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Updating...
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

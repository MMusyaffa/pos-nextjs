"use client"

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/api/products";
import { getCategories } from "@/api/categories";
import { uploadFile } from "@/api/uploads";

export default function AddProduct({ setChanges }) {

    const [image_url, setImageUrl] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [available, setAvailable] = useState("");
    const [category_id, setCategoryId] = useState("");
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
        setName("");
        setPrice("");
        setDescription("");
        setAvailable("");
        setCategoryId("");
        setImageUrl("");
        setImageUploadId(null);
        refUploadFile.current.value = "";
    };

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

    const addProductForm = async (e) => {
        handleBeforeSubmit(e);

        const product = {
            name: name,
            description: description,
            price: price,
            category_id: category_id,
            image_url: image_url,
            upload_id: imageUploadId,
        }

        try {
            await addProduct(product);
        } catch (errl) {
            // TODO: Handle if add product error
        }

        handleAfterSubmit();
    }

    function handleChange() {
        setModal(!modal);
    }

    const handleCategoriesFocus = (e) => {
        getCategories().then((data) => {
            setCategories(data);
        });
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

                    <form onSubmit={addProductForm}>

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
                                disabled={imageUploadId}
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
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    onFocus={handleCategoriesFocus}
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

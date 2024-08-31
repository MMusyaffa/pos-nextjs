"use client"

import { useRef, useState } from "react";
import { updateCategory } from "@/api/categories";

export default function UpdateCategory({ category, setChanges }) {

    const [name, setName] = useState(category.name);
    const [image_url, setImageUrl] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    // image upload id from the server
    const [imageUploadId, setImageUploadId] = useState(null);

    // reference html input file
    const refUploadFile = useRef(null);

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
        handleBeforeSubmit(e, setIsMutating);

        const updatedCategory = {
            name: name,
            image_url: image_url,
            upload_id: imageUploadId
        }

        try {
            await updateCategory(category.id, updatedCategory);
        } catch (error) {
            // TODO: Handle if add category error
        }

        handleAfterSubmit();
    };

    function handleChange() {
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
                        Edit Category {category.name}
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="form-control mt-3">
                            <label className="label font-bold">
                                Categories Image
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
                                Categories name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input w-full input-bordered"
                                placeholder="Enter Categories name"
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

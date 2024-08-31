"use client"

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { addCategory } from "@/api/categories";
import { uploadFile } from "@/api/uploads";

export default function AddCategory({ setChanges }) {

    const [image_url, setImageUrl] = useState("");
    const [name, setName] = useState("");
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
        setName("");
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

    const addCategoryForm = async (e) => {
        handleBeforeSubmit(e);

        const category = {
            name: name,
            image_url: image_url,
            upload_id: imageUploadId
        }

        try {
            await addCategory(category);
        } catch (error) {
            // TODO: Handle if add category error
        }

        handleAfterSubmit();
    }

    function handleChange() {
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
                        Add New categories
                    </h3>

                    <form onSubmit={addCategoryForm}>

                        <div className="form-control mt-3">

                            {/* Add image upload */}
                            <label className="label font-bold">
                                Categories Image
                            </label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="input w-full input-bordered"
                                ref={refUploadFile}
                            />

                            {/* Add image URL */}
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

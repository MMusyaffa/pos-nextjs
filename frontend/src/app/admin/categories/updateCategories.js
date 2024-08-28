"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/api/categories";

export default function UpdateCategories(categories) {

    const [name, setName] = useState(categories.name);
    const [image_url, setImage] = useState(categories.image_url);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    function handleBeforeSubmit(e, setIsMutating) 
    {
        e.preventDefault();
        setIsMutating(true);
    }

    function handleAfterSubmit(setIsMutating, router, setModal)
    {
        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = (e) => {
        handleBeforeSubmit(e, setIsMutating);

        updateCategory(name, image_url);

        handleAfterSubmit(setIsMutating, setName, router, setModal);
    };

    function handleChange()
    {
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
                    Edit Category {categories.name}
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
                        />
                        <p className="mt-2">
                            Or Input Image URL
                        </p>
                        <input 
                            type="url"
                            value={image_url}
                            onChange={(e) => setImage(e.target.value)}
                            className="input w-full input-bordered mt-2.5"
                            placeholder="Enter Image URL"
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

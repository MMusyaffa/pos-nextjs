"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addBoardgame } from "@/api/boardgames";

export default function AddBoardgames() {

    const [image_url, setImage] = useState(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    function handleBeforeSubmit(e, setIsMutating) 
    {
        e.preventDefault();
        setIsMutating(true);
    }

    function handleAfterSubmit(setIsMutating, setName, setCategory, router, setModal) 
    {
        setIsMutating(false);
        setName("");
        setCategory("");
        router.refresh();
        setModal(false);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const addBoardgamesForm = (e) => {
        handleBeforeSubmit(e, setIsMutating);

        addBoardgame(name, category, image_url);

        handleAfterSubmit(setIsMutating, setName, router, setModal);
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
                    Add New board games
                </h3>
                
                <form onSubmit={addBoardgamesForm}>
                    
                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Board Game Image
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
                            Board Game name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Board Game name"
                        />
                    </div>

                    <div className="form-control mt-3">
                        <label className="label font-bold">
                            Board Game category
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="input w-full input-bordered"
                            placeholder="Enter Board Game Category name"
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

"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateCategories(categories) {

    const [title, setTitle] = useState(categories.title);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleUpdate(e)
    {
        e.preventDefault();

        setIsMutating(true);

        await fetch(`http://localhost:4000/categories/${categories.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({
                    title: title,
                })
        });

        setIsMutating(false);

        router.refresh();
        setModal(false);
    }

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
                    Edit product {categories.title}
                </h3>

                <form onSubmit={handleUpdate}>

                    <div className="form-control">
                        <label className="label font-bold">
                            Categories name
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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

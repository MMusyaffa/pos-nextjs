"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCategories(categories) {

    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

    async function handleDelete(categoriesId)
    {
        setIsMutating(true);

        await fetch (`http://localhost:4000/categories/${categoriesId}`,
        {
            method: 'DELETE',
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
        <button className="btn btn-error btn-sm" onClick={handleChange}>
            Delete
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
                    Delete this {categories.name}?
                </h3>

                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>
                        Close
                    </button>
                    {!isMutating ? (
                        <button
                        type="button" onClick={() => handleDelete(categories.id)} className="btn btn-primary">
                        Delete
                      </button>
                    ) : (
                        <button type="button" className="btn loading">
                        Deleting...
                        </button>
                    )}
                </div>

            </div>
        </div>
   </div>
  );
}

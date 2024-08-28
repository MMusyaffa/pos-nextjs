"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/api/products";

export default function DeleteProduct(product) {

    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const router = useRouter();

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
                    Delete this {product.name}?
                </h3>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>
                        Close
                    </button>
                    {!isMutating ? (
                        <button
                        type="button" onClick={() => deleteProduct(productId, setIsMutating, router, setModal)}
                        className="btn btn-primary">
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

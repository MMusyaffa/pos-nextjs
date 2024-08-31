"use client"

import { useState } from "react";
import { deleteCategory } from "@/api/categories";

export default function DeleteCategory({ category, setChanges }) {

    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    function handleBeforeDelete() {
        setIsMutating(true);
    }

    function handleAfterDelete() {
        setIsMutating(false);
        setModal(false);
        setChanges((prev) => prev + 1);
    }

    const deleteCategoryForm = async (e) => {
        handleBeforeDelete(e);

        await deleteCategory(category.id);

        handleAfterDelete();
    }

    function handleChange() {
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
                        Delete this {category.name}?
                    </h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {!isMutating ? (
                            <button
                                type="button"
                                onClick={deleteCategoryForm}
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

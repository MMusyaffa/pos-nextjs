const usingDummyData = true;

import dummyData from "../data/dummy.json";

export async function getCategory()
{
    if (usingDummyData) {
        return dummyData.data.categories;
    }
    else {
        return null;
    }
}

export async function addCategory(e, name, image_url, setIsMutating, setName, router, setModal) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:4000/categories", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            image_url: image_url,
        })
    });

    setIsMutating(false);

    setName("");
    router.refresh();
    setModal(false);
}

export async function updateCategory(e, name, image_url, setIsMutating, router, setModal)
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
                name: name,
                image_url: image_url,
            })
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
}

export async function deleteCategory(categoriesId, setIsMutating, router, setModal)
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

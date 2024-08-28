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

export async function addCategory(name, image_url)
{
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
}

export async function updateCategory(name, image_url)
{
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
}

export async function deleteCategory(categoriesId)
{
    await fetch (`http://localhost:4000/categories/${categoriesId}`,
    {
        method: 'DELETE',
    });
}
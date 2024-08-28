const usingDummyData = true;

import dummyData from "../data/dummy.json";

export async function getProduct()
{
    if (usingDummyData) {
        return dummyData.data.products;
    }
    else {
        const response = await fetch("http://localhost:5000/data");
        const data = await response.json();
        return data.products || [];
    }
}

export async function addProduct(e, name, price, description, available, category_id, 
                                image_url, setIsMutating, setName, setPrice, 
                                setDescription, setAvailable, setCategories, router, setModal)
{
    e.preventDefault();

    setIsMutating(true);

    await fetch ("http://localhost:5000/data",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                name: name,
                price: price,
                description: description,
                available: available,
                category_id: category_id,
                image_url: image_url,
            })
    });

    setIsMutating(false);

    setName("");
    setPrice("");
    setDescription("");
    setAvailable("");
    setCategories("");
    router.refresh();
    setModal(false);
}

export async function updateProduct(e, name, price, description, available, category_id, 
                                    image_url, setIsMutating, router, setModal)
{
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:5000/data/${product.id}`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                name: name,
                price: price,
                description: description,
                available: available,
                category_id: category_id,
                image_url: image_url,
            })
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
}

export async function deleteProduct(productId, setIsMutating, router, setModal)
{
    setIsMutating(true);

    await fetch (`http://localhost:5000/data/${productId}`,
    {
        method: 'DELETE',
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
}
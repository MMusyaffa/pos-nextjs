const usingDummyData = true;

import dummyUsers from "../data/dummyUser.json";

export async function getUser()
{
    if (usingDummyData) {
        return dummyUsers.data.account;
    }
    else {
        const response = await fetch("http://localhost:4000/data");
        const data = await response.json();
        return data.account || [];
    }
}

export async function addUser(username, password, name, role, phone_number, address, is_active)
{
    await fetch ("http://localhost:4000/data",
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                username: username,
                password: password,
                name: name,
                role: role,
                phone_number: phone_number,
                address: address,
                is_active: is_active,
            })
    });
}

export async function updateUser(username, password, name, role, phone_number, address, is_active)
{
    await fetch(`http://localhost:4000/data/${account.id}`,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:
            JSON.stringify({
                username: username,
                password: password,
                name: name,
                role: role,
                phone_number: phone_number,
                address: address,
                is_active: is_active,
            })
    });
}

export async function deleteUser(userId, setIsMutating, router, setModal)
{
    await fetch (`http://localhost:4000/data/${userId}`,
    {
        method: 'DELETE',
    });
}
    

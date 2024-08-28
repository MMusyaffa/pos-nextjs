const usingDummyData = true;

import dummyUsers from "../data/dummyUser.json";

export async function getUser()
{
    if (usingDummyData) {
        return dummyUsers.account;
    }
    else {
        const response = await fetch("http://localhost:4000/data");
        const data = await response.json();
        return data.account || [];
    }
}

export async function addUser(e, username, password, name, role, phone_number, 
                            address, is_active, setIsMutating, setUsername, setPassword,
                            setName, setRole, setPhone_number, setAddress, setStatus, router, setModal)
{
    e.preventDefault();

    setIsMutating(true);

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

    setIsMutating(false);

    setUsername("");
    setPassword("");
    setName("");
    setRole("");
    setPhone_number("");
    setAddress("");
    setStatus("");

    router.refresh();
    setModal(false);
}

export async function updateUser(e, username, password, name, role, phone_number, 
                                address, is_active, setIsMutating, router, setModal)
{
    e.preventDefault();

    setIsMutating(true);

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

    setIsMutating(false);

    router.refresh();
    setModal(false);
}

export async function deleteUser(userId, setIsMutating, router, setModal)
{
    setIsMutating(true);

    await fetch (`http://localhost:4000/data/${userId}`,
    {
        method: 'DELETE',
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
}
    

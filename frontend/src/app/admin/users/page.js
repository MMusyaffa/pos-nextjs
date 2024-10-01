"use client"

import { useEffect, useState } from "react";
import { getUser } from "@/api/user";
import NavbarAdmin from "../components/Navbar";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";

export default function UsersList() 
{
    const [getUsers, setGetUsers] = useState([]);

    useEffect(()=> {
        getUser()
            .then( function (tit) {setGetUsers(tit)
            })

    }, []);
    
    return (
        <div className="w-screen">
            <div className="ml-56">
                <NavbarAdmin />
            </div>
            <div className="ml-56 mt-5">
                <AddUser/>
            </div>
            <table className="table ml-56 mt-5 mb-10 w-10/12">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {getUsers.map((user, index) => 
                    (
                        <tr key = {user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.phone_number}</td>
                            <td>{user.address}</td>
                            <td>{user.is_active === 1 ? 'Active' : 'Non-Active'}</td>
                            <td className="flex">
                                <div className="mr-1">
                                    <UpdateUser {...user}/>
                                </div>
                                    <DeleteUser {...user}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 